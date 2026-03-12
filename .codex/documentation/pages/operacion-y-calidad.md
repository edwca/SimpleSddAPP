# Operacion y Calidad

## Requisitos locales

- Node.js 20 o superior
- npm 10 o superior

## Variables de entorno

### Backend

- `PORT`
- `API_BASE_URL`
- `RATE_LIMIT_MAX`
- `ALLOWED_ORIGIN`

### Frontend

- `VITE_API_URL`

## Comandos principales

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run format:check`
- `npm run test:e2e`
- `npm run test:e2e:ui`

## Calidad tecnica

- ESLint para validacion estatica
- Prettier para formato
- Husky y `lint-staged` para automatizacion de calidad en cambios locales

## Pruebas

La cobertura automatizada actual valida el flujo principal de navegacion de razas mediante Playwright + Cucumber + `playwright-bdd`.

Escenario cubierto:

- abrir la aplicacion
- seleccionar una raza
- verificar que se muestra la ficha principal y que el titulo refleja la seleccion

## Despliegue

- GitHub Actions:
  - workflow versionado en `.github/workflows/ci.yml`
- Vercel:
  - configuracion en `vercel.json`
  - requiere `VITE_API_URL` apuntando al backend desplegado
- Render:
  - configuracion base en `render.yaml`
  - requiere `ALLOWED_ORIGIN` apuntando al frontend publicado

## Artefactos no canonicos

Estos directorios pueden regenerarse y no deben tratarse como fuente primaria de conocimiento:

- `backend/dist/`
- `frontend/dist/`
- `playwright-report/`
- `test-results/`
