# Base Documental del Proyecto

Este directorio concentra la documentacion operativa y de conocimiento lista para capturarse posteriormente en Notion usando la skill local `notion-knowledge-capture`.

## Estructura

- `project-hub.md`: portada y resumen ejecutivo del proyecto
- `pages/project-overview.md`: alcance funcional y contexto de producto
- `pages/architecture.md`: arquitectura, capas y decisiones tecnicas
- `pages/api-interna.md`: contratos y reglas de la API interna
- `pages/frontend-ux.md`: experiencia, componentes y comportamiento de la UI
- `pages/operacion-y-calidad.md`: variables de entorno, ejecucion y validacion
- `pages/decision-log.md`: decisiones relevantes y lineamientos de continuidad

## Regla de mantenimiento

Cuando cambie el proyecto, esta base documental debe mantenerse sincronizada junto con:

- `AGENTS.md`
- `.codex/prompts/project.md`
- `.codex/specs/product-spec.md`
- `.codex/specs/api-spec.md`
- `.codex/specs/ui-spec.md`
- `.codex/architecture/architecture.md`
- `.codex/skills/README.md`

## Uso previsto

- servir como fuente local versionada de conocimiento del proyecto
- actuar como staging para futura migracion o captura en Notion
- evitar rehacer documentacion a partir de conversaciones dispersas
