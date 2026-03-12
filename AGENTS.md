# Instrucciones del Proyecto

## Fuente local de skills

Este repositorio trata `.codex/skills/` como su fuente de verdad para skills del proyecto.

Reglas operativas:

- Al trabajar en este repo, revisar primero las skills disponibles en `.codex/skills/`.
- Si existe una skill local con el mismo nombre que una global, priorizar la version local del repo.
- Usar `.codex/skills/README.md` como manifiesto para entender que skills fueron incluidas, para que se esperan y cual es su estado de uso.
- No asumir autodeteccion por el simple hecho de que la carpeta exista: cuando corresponda, indicar explicitamente que este proyecto usa `.codex/skills/` como fuente de skills.

## Estado actual del proyecto

El proyecto implementado es `Search Dog`, una aplicacion web construida con Spec Driven Development (SDD) para explorar razas de perros a traves de un backend proxy.

Capacidades ya implementadas:

- listado de razas en sidebar desktop y drawer mobile
- busqueda de razas con `Autocomplete`
- vista principal con una sola imagen representativa por raza
- seleccion automatica de la primera raza disponible
- historia integrada en la misma vista con enriquecimiento desde Wikipedia y fallback interno
- descarga de la imagen representativa desde el backend
- ampliacion de la imagen principal en modal
- descarga de PDF por raza con historia y enlaces de referencia
- pruebas E2E con Playwright, Cucumber y `playwright-bdd`
- backend endurecido con `helmet`, `cors`, `express-rate-limit` y manejo centralizado de errores

Endpoints internos vigentes:

- `GET /health`
- `GET /api/breeds`
- `GET /api/breeds/:breed/images`
- `GET /api/breeds/:breed/featured-image`
- `GET /api/breeds/:breed/history`
- `GET /api/breeds/:breed/report.pdf`

## Documentacion canonica

Los documentos que deben mantenerse sincronizados cuando cambie el comportamiento del proyecto son:

- `AGENTS.md`: politica operativa del repositorio
- `.codex/prompts/project.md`: prompt base del proyecto y lineamientos de continuidad
- `.codex/specs/product-spec.md`: alcance funcional vigente
- `.codex/specs/api-spec.md`: contrato de la API interna
- `.codex/specs/ui-spec.md`: experiencia y componentes de la interfaz
- `.codex/architecture/architecture.md`: arquitectura implementada
- `.codex/skills/README.md`: manifiesto local de skills y uso esperado
- `.codex/documentation/`: base documental local lista para captura posterior en Notion

Si cambia una funcionalidad, una dependencia externa, un flujo de validacion o el uso de skills, actualizar tambien estos documentos para evitar deriva documental.

## Convenciones operativas

- Todo el contenido documental del proyecto debe mantenerse en idioma español.
- El frontend nunca debe consumir directamente Dog CEO ni Wikipedia; toda integracion externa pasa por el backend.
- La arquitectura de frontend es feature-based y la de backend es por capas; preservar esa separacion antes de introducir nuevas carpetas o acoplamientos.
- Los artefactos generados (`backend/dist/`, `frontend/dist/`, `playwright-report/`, `test-results/`) no son fuente de verdad documental.
- Si una CLI externa instala skills fuera de `.codex/skills/`, se deben reflejar o versionar tambien en `.codex/skills/`, que sigue siendo la fuente local de verdad.
- Si se agregan nuevas variables de entorno, reflejarlas en los `.env.example`, en las specs y en la documentacion operativa relevante.
- Cuando se use una skill local, anunciarla explicitamente y explicar por que aplica al trabajo en curso.

## Prompt del proyecto

El prompt base del proyecto vive en `.codex/prompts/project.md`.
Si se actualizan workflows, bootstrap, alcance funcional o convenciones de uso de skills, reflejarlo tambien alli para mantener consistencia.

## Notion y captura de conocimiento

La skill local `notion-knowledge-capture` debe usarse cuando se documenten decisiones, arquitectura, runbooks, FAQ o cierres del proyecto en Notion.

Regla practica:

- la fuente primaria para crear o actualizar contenido en Notion debe salir del estado real del repo y de los documentos canonicos anteriores
- `.codex/documentation/` funciona como staging local para esa captura y debe mantenerse utilizable por si la integracion con Notion no esta disponible
- si no existe un MCP operativo para Notion en la sesion, puede usarse automatizacion de navegador como fallback, pero sin reemplazar la documentacion versionada del repo
