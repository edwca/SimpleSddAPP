# Arquitectura

## Vision general

El sistema se organiza en tres bloques:

- `frontend/`: aplicacion React para navegacion, spotlight informativo y descarga de reportes
- `backend/`: API Express que integra Dog CEO, Wikipedia, imagen representativa y generacion PDF
- `tests/`: suite E2E BDD que valida el flujo principal

Flujo principal:

`Browser -> Frontend React -> Backend Express -> Dog CEO / Wikipedia`

## Frontend

Patron principal: feature-based architecture.

Capas relevantes:

- `app/`: composicion principal y providers
- `features/breeds/`: componentes y hooks de negocio
- `services/api.ts`: cliente HTTP hacia el backend
- `hooks/useSelectedBreed.ts`: estado local de raza seleccionada
- `styles/`: tema y estilos globales
- `types/`: contratos de datos

Decisiones:

- React Query maneja el estado remoto
- `useDeferredValue` suaviza cambios de contenido al cambiar de raza
- `startTransition` reduce bloqueo perceptible al actualizar la seleccion
- la feature `breeds` se centra en una vista `spotlight` con menos sobrecarga visual y menos acoplamiento a galerias

## Backend

Patron principal: layered architecture.

Capas relevantes:

- `routes/`: definicion de endpoints
- `controllers/`: adaptacion HTTP
- `services/`: reglas de negocio y orquestacion
- `clients/`: acceso a APIs externas
- `middleware/`: seguridad, errores y 404
- `config/`: variables de entorno
- `utils/`: errores reutilizables

Responsabilidades destacadas:

- normalizar el catalogo de razas
- validar entradas de usuario
- resolver historia por raza con fallback
- resolver y servir la imagen principal por raza
- generar el PDF por raza

## Integraciones externas

### Dog CEO

- listado de razas
- imagenes por raza

### Wikipedia

- busqueda de titulos candidatos en ES y EN
- resumen de pagina para enriquecer historia

## Restricciones y lineamientos

- el frontend no consume APIs externas directamente
- la generacion documental PDF vive en backend
- la logica de enriquecimiento historico vive en backend para ocultar complejidad de matching y fallback
- la logica de imagen representativa tambien vive en backend para evitar dependencias directas de URLs externas
