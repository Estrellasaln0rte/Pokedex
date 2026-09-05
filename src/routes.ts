import { Router } from "express";
import { getPokemon } from "./controllers/pokemon";
import { getTiposDePokemon } from "./controllers/tipos";

export const router = Router();

// método + dirección → controlador. La ruta NO resuelve nada.
router.get("/pokemon/:nombre", getPokemon);

// EL RETO (dificultad media): solo los tipos de un pokémon
router.get("/pokemon/:nombre/tipos", getTiposDePokemon);
