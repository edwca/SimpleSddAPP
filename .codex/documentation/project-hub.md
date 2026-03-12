# Search Dog - Hub de Documentacion

## Resumen ejecutivo

Search Dog es una aplicacion web construida con Spec Driven Development (SDD) para explorar razas de perros desde una vista unica por raza. El frontend consume exclusivamente un backend propio en Express, que actua como proxy de Dog CEO, sirve la imagen representativa, enriquece la experiencia con historia de razas desde Wikipedia y genera un PDF descargable por raza.

## Objetivo del producto

- explorar razas de perros desde una UI clara y responsive
- visualizar una sola imagen representativa por raza
- consultar una reseña historica por raza sin exponer integraciones externas en el frontend
- descargar la imagen principal desde el backend
- descargar un reporte PDF compacto por raza

## Stack

- Frontend: React, TypeScript, Vite, Material UI, React Query
- Backend: Node.js, Express, TypeScript, Axios, PDFKit
- Calidad: ESLint, Prettier, Husky
- E2E: Playwright, Cucumber, playwright-bdd

## Funcionalidades implementadas

- sidebar de razas en desktop y drawer en mobile
- buscador de razas con `Autocomplete`
- seleccion automatica de una raza inicial
- spotlight principal con una sola imagen por raza
- historia integrada en la misma vista con fuente externa o fallback interno
- descarga de imagen principal y modal de ampliacion
- descarga de PDF por raza
- healthcheck para operacion local y pruebas

## Arquitectura

### Flujo general

`Browser -> Frontend React -> Backend Express -> Dog CEO / Wikipedia`

### Frontend

- `app/`: composicion principal y providers
- `features/breeds/`: componentes y hooks de negocio
- `services/api.ts`: cliente HTTP
- `hooks/useSelectedBreed.ts`: estado local de la raza activa
- `styles/`: tema y estilos globales
- `types/`: contratos consumidos por la UI

### Backend

- `routes/`: endpoints HTTP
- `controllers/`: adaptadores HTTP
- `services/`: reglas de negocio y generacion PDF
- `clients/`: integracion con Dog CEO y Wikipedia
- `middleware/`: errores, 404, seguridad
- `config/`: lectura de entorno

## API interna

- `GET /health`
- `GET /api/breeds`
- `GET /api/breeds/:breed/images`
- `GET /api/breeds/:breed/featured-image`
- `GET /api/breeds/:breed/history`
- `GET /api/breeds/:breed/report.pdf`

## Integraciones externas

### Dog CEO

- provee catalogo de razas
- provee imagenes por raza

### Wikipedia

- provee resumen historico por raza
- el backend intenta variantes de titulo y usa fallback interno si no hay resultado util

## Seguridad y operacion

- `helmet` para headers de seguridad
- `cors` restringido por `ALLOWED_ORIGIN`
- `express-rate-limit` sobre `/api`
- validacion de entrada para `breed`
- manejo centralizado de errores

## Variables de entorno

### Backend

- `PORT`
- `API_BASE_URL`
- `RATE_LIMIT_MAX`
- `ALLOWED_ORIGIN`

### Frontend

- `VITE_API_URL`

## Calidad y validacion

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run format:check`
- `npm run test:e2e`

## Despliegue preparado

- GitHub Actions: `.github/workflows/ci.yml`
- Vercel: `vercel.json`
- Render: `render.yaml`

## Documentacion versionada

- `AGENTS.md`
- `.codex/prompts/project.md`
- `.codex/specs/product-spec.md`
- `.codex/specs/api-spec.md`
- `.codex/specs/ui-spec.md`
- `.codex/architecture/architecture.md`
- `.codex/skills/README.md`

## Siguientes usos recomendados en Notion

- pagina hub del proyecto
- subpagina de arquitectura
- subpagina de API interna
- subpagina de UI y UX
- subpagina de operacion local y pruebas
- decision log para futuros cambios

## Paginas locales preparadas para captura

- `README.md`
- `pages/project-overview.md`
- `pages/architecture.md`
- `pages/api-interna.md`
- `pages/frontend-ux.md`
- `pages/operacion-y-calidad.md`
- `pages/decision-log.md`
