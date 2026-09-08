import type { Request, Response } from "express";

const URL_POKEAPI_TIPO = "https://pokeapi.co/api/v2/type";

// GET /api/tipos/:tipo — todos los pokémon que tienen ese tipo
export async function getPokemonesPorTipo(req: Request, res: Response) {
  const { tipo } = req.params;

  try {
    const respuesta = await fetch(`${URL_POKEAPI_TIPO}/${tipo.toLowerCase()}`);
    if (!respuesta.ok) {
      return res.status(404).json({ error: `No existe el tipo "${tipo}"` });
    }
    const datos = await respuesta.json();

    res.json({
      tipo: datos.name,
      pokemons: datos.pokemon.map((p: any) => p.pokemon.name),
    });
  } catch (error) {
    console.error("Error al obtener pokémon por tipo:", error);
    res.status(502).json({ error: "No se pudo conectar con la PokeAPI" });
  }
}
