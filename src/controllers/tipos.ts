import type { Request, Response } from "express";

const URL_POKEAPI = "https://pokeapi.co/api/v2/pokemon";

// GET /api/pokemon/:nombre/tipos — el reto (opción media #1)
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
