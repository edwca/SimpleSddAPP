# Arquitectura

## Vision general

El sistema se divide en dos aplicaciones desacopladas y una capa de pruebas:

- `frontend/`: interfaz React para exploracion, spotlight informativo y descarga de artefactos
- `backend/`: API proxy en Express que integra Dog CEO, Wikipedia, sirve la imagen representativa y genera PDFs
- `tests/`: suite E2E BDD que valida el flujo principal desde la perspectiva del usuario

Flujo principal:

```text
Browser
  -> Frontend React
    -> Backend Express
      -> Dog CEO API
      -> Wikipedia API
```

## Arquitectura Frontend

Enfoque: feature-based architecture con capas compartidas minimas.

```text
src/
  app/
    App.tsx
    providers.tsx
  features/
    breeds/
      components/
      hooks/
  components/
    LoadingSkeleton.tsx
  hooks/
    useSelectedBreed.ts
  services/
    api.ts
  styles/
    global.css
    theme.ts
  types/
    breed.ts
```

Principios:

- Estado remoto manejado con React Query
- Estado local de seleccion encapsulado en `useSelectedBreed`
- Servicios HTTP centralizados en `services/api.ts`
- Componentes de feature separados de la infraestructura de app
- Tipos compartidos para contratos de API
- La UI asume al backend como unico punto de entrada a datos externos
- La feature `breeds` se simplifica a una vista `spotlight` en lugar de tabs y grillas extensas

## Arquitectura Backend

Enfoque: layered architecture.

```text
src/
  app.ts
  server.ts
  routes/
  controllers/
  services/
  clients/
  middleware/
  config/
  utils/
```

Responsabilidades:

- `app.ts`: composicion de middlewares, seguridad, healthcheck y rutas
- `routes/`: definicion de endpoints HTTP
- `controllers/`: traduccion entre HTTP y servicios de dominio
- `services/`: orquestacion de catalogo, historia, imagen representativa y generacion PDF
- `clients/`: adaptadores a Dog CEO y Wikipedia
- `middleware/`: seguridad, errores y 404
- `config/`: lectura y defaults de entorno
- `utils/`: errores de aplicacion reutilizables

## Integraciones externas

- Dog CEO:
  - fuente del catalogo de razas
  - fuente de imagenes por raza
- Wikipedia ES/EN:
  - busqueda de titulos candidatos
  - obtencion de resumen enriquecido por raza

## Decisiones clave

- El frontend nunca consume APIs externas de forma directa
- El backend normaliza respuestas para desacoplar a la UI del proveedor externo
- La historia de raza se resuelve en backend para ocultar complejidad de busqueda y fallback
- La imagen representativa tambien se resuelve en backend para evitar que la UI dependa del URL remoto del proveedor
- La generacion de PDF vive en backend para evitar logica documental en el cliente
- La seleccion de raza vive en frontend y dispara consultas derivadas de imagenes e historia
- Las pruebas E2E validan el flujo principal de navegacion sobre la aplicacion completa
