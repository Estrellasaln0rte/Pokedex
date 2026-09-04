import type { Request, Response } from "express";

const URL_POKEAPI = "https://pokeapi.co/api/v2/pokemon";

// GET /api/pokemon/:nombre
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

// GET /api/pokemon/:nombre/tipos  → el reto
export async function getTiposDePokemon(req: Request, res: Response) {
  const { nombre } = req.params;

  const respuesta = await fetch(`${URL_POKEAPI}/${nombre.toLowerCase()}`);
  if (!respuesta.ok) {
    return res.status(404).json({ error: "No lo encontré" });
  }
  const datos = await respuesta.json();

  res.json({
    nombre: datos.name,
    tipos: datos.types.map((t: any) => t.type.name),
  });
}
