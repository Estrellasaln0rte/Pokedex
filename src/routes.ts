import { Router } from "express";
import { getListaPokemon, getPokemon } from "./controllers/pokemon";
import { getPokemonesPorTipo } from "./controllers/tipos";

export const router = Router();

// método + dirección → controlador. La ruta NO resuelve nada.
router.get("/pokemon", getListaPokemon);
router.get("/pokemon/:nombre", getPokemon);

// filtro: todos los pokémon que tienen un tipo dado (ej. /tipos/fire)
router.get("/tipos/:tipo", getPokemonesPorTipo);
