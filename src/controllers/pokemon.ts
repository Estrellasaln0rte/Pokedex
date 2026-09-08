import type { Request, Response } from "express";

const URL_POKEAPI = "https://pokeapi.co/api/v2/pokemon";

// GET /api/pokemon?limit=N - Obtener lista de pokemones (todos si no se pasa limit)
export async function getListaPokemon(req: Request, res: Response) {
  // sin límite explícito, pedimos un número lo bastante grande para traerlos todos
  const limit = req.query.limit ?? 100000;

  const respuesta = await fetch(`${URL_POKEAPI}?limit=${limit}`);
  const datos = await respuesta.json();

  res.json({
    pokemons: datos.results.map((p: any) => p.name),
  });
}

// GET /api/pokemon/:nombre - Obtener información de un pokemon específico
export async function getPokemon(req: Request, res: Response) {
  // A · LEER EL PEDIDO — el :nombre de la ruta
  const { nombre } = req.params;

  // B · CONSEGUIR EL DATO — mi server se vuelve CLIENTE de otra API
  const respuesta = await fetch(`${URL_POKEAPI}/${nombre.toLowerCase()}`);
  if (!respuesta.ok) {
    return res.status(404).json({ error: "No lo encontré" });
  }
  const datos = await respuesta.json();

  // C · RESPONDER — reformo: solo lo que sirve, con nombres claros
  res.json({
    id: datos.id,
    nombre: datos.name,
    imagen: datos.sprites.other["official-artwork"].front_default,
    tipos: datos.types.map((t: any) => t.type.name),
  });
}
