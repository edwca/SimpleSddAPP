# Search Dog

Aplicacion web para explorar razas de perros desde una vista informativa unica, con imagen representativa, historia resumida y descargas servidas por un backend proxy.

## Objetivo

El proyecto sigue Spec Driven Development (SDD): primero se documentan producto, API, UI y arquitectura, y luego se implementan backend, frontend y pruebas E2E sobre esa base.

## Arquitectura

- Frontend React + TypeScript + Vite + Material UI + React Query
- Backend Node.js + Express + TypeScript + Axios
- El frontend consume unicamente el backend
- El backend actua como proxy hacia `https://dog.ceo/dog-api/` y Wikipedia
- La imagen principal se sirve desde un endpoint interno para evitar dependencia directa del URL externo

Flujo principal:

`Browser -> Frontend React -> Backend Express -> Dog CEO API / Wikipedia`

## Estructura

```text
.github/
.codex/
  architecture/
  documentation/
  prompts/
  skills/
  specs/
backend/
docker/
frontend/
render.yaml
scripts/
tests/
vercel.json
```

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Variables de entorno

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

## Ejecucion local

Instalar dependencias:

```bash
npm install
```

Levantar backend y frontend desde la raiz:

```bash
npm run dev
```

Servicios esperados:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Experiencia actual

- branding visible `Search Dog`
- sidebar en desktop y drawer en mobile
- vista principal unificada por raza con una sola imagen representativa
- historia integrada en la misma pantalla, sin tabs
- descarga de imagen representativa
- descarga de PDF por raza
- modal para ampliar la imagen principal

## Calidad de codigo

- `npm run lint`
- `npm run format:check`

## Pruebas E2E

Las pruebas usan Playwright + Cucumber + playwright-bdd.

```bash
npm run test:e2e
```

Modo interactivo:

```bash
npm run test:e2e:ui
```

## Docker

Se incluye una configuracion base en [`docker/docker-compose.yml`](./docker/docker-compose.yml) para ejecutar el entorno en modo desarrollo.

## Despliegue

### GitHub

El repositorio incluye [`ci.yml`](./.github/workflows/ci.yml) para validar `lint`, `build` y `test:e2e` en pushes y pull requests.

### Vercel

- configuracion: [`vercel.json`](./vercel.json)
- build: `npm run build -w frontend`
- output: `frontend/dist`
- variable requerida:
  - `VITE_API_URL=https://<tu-backend-render>.onrender.com/api`

### Render

- configuracion: [`render.yaml`](./render.yaml)
- servicio previsto: backend Express
- comandos:
  - build: `npm install && npm run build -w backend`
  - start: `npm run start -w backend`
- variables recomendadas:
  - `API_BASE_URL=https://dog.ceo/api`
  - `RATE_LIMIT_MAX=100`
  - `ALLOWED_ORIGIN=https://<tu-frontend-vercel>.vercel.app`
