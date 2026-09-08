# Pokedex — Backend (Express + TypeScript)

API que sirve de intermediaria entre el frontend y [PokéAPI](https://pokeapi.co), devolviendo solo los datos que el frontend necesita.

## Elección del backend

### Matriz de decisión

| Criterio | Peso | Express (Node + TS) | Flask (Python) | Spring Boot (Java) |
|---|---|---|---|---|
| Familiaridad del equipo con el lenguaje | 30% | 5 | 3 | 2 |
| Velocidad de desarrollo para el alcance de la tarea | 25% | 5 | 4 | 2 |
| Consistencia con el resto del stack del proyecto | 20% | 5 | 2 | 2 |
| Documentación y soporte de la comunidad | 15% | 5 | 5 | 4 |
| Curva de configuración inicial | 10% | 4 | 5 | 2 |
| **Puntaje ponderado** | | **4.9** | 3.55 | 2.3 |

### Justificación

Elegimos **Express con TypeScript** porque, para el alcance de esta tarea —un servidor que consume PokéAPI, reforma la respuesta y expone un par de endpoints propios— el criterio que más pesa es qué tan rápido el equipo puede construir y mantener el código sin fricción. JavaScript/TypeScript es el lenguaje con el que el equipo ya tiene más práctica desde clases anteriores del curso, lo que reduce el tiempo de configuración inicial y facilita que cualquiera del equipo pueda leer y modificar rutas o controladores sin curva de aprendizaje adicional. Express además tiene un ecosistema (npm) muy grande para este tipo de servidores ligeros tipo proxy/API, y su modelo de I/O no bloqueante encaja bien con un servidor cuyo trabajo principal es esperar respuestas de una API externa.

Flask fue la alternativa más cercana (configuración aún más simple), pero quedó en segundo lugar porque el equipo tiene menos práctica reciente con Python. Spring Boot se descartó por la curva de configuración inicial (Maven/Gradle, anotaciones, estructura de proyecto) que no se justifica para un servicio de este tamaño.

> **Nota del equipo:** ajusten los pesos/puntajes de la tabla si su razonamiento real fue distinto (por ejemplo, si el frontend ya está en JS/React y eso pesó más, o si alguien del equipo tenía experiencia previa fuerte en Node).

## Endpoints

### 1. `GET /api/pokemon/:nombre`

Busca un pokémon por nombre en PokéAPI y devuelve solo los campos útiles.

- **200 OK** — si el pokémon existe:
  ```json
  { "id": 25, "nombre": "pikachu", "imagen": "https://...", "tipos": ["electric"] }
  ```
- **404 Not Found** — si no existe:
  ```json
  { "error": "No lo encontré" }
  ```

### 2. `GET /api/pokemon/:nombre/tipos`

Igual al anterior, pero responde solo el nombre y los tipos del pokémon.

- **200 OK** — si el pokémon existe:
  ```json
  { "nombre": "pikachu", "tipos": ["electric"] }
  ```
- **404 Not Found** — si no existe:
  ```json
  { "error": "No lo encontré" }
  ```

## Cómo correrlo

```bash
npm install
npm run dev
```

Servidor en `http://localhost:3000`. Probar en el navegador:

```
http://localhost:3000/api/pokemon/pikachu
http://localhost:3000/api/pokemon/pikachu/tipos
```
