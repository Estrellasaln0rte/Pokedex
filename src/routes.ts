import { Router } from "express";
import { getPokemon, getTiposDePokemon } from "./controllers/pokemon";

export const router = Router();

// método + dirección → controlador. La ruta NO resuelve nada.
router.get("/pokemon/:nombre", getPokemon);

// EL RETO (dificultad media): solo los tipos de un pokémon
router.get("/pokemon/:nombre/tipos", getTiposDePokemon);
