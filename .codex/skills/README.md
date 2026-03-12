# Skills del Proyecto

Este directorio contiene las skills versionadas localmente para este proyecto y debe leerse como manifiesto operativo del repo.

Importante:

- Este proyecto usa `.codex/skills/` como fuente local de verdad para skills.
- Si una skill existe tanto en el repo como a nivel global, prevalece la version local del repo.
- `AGENTS.md` define la politica oficial de prioridad, descubrimiento y mantenimiento.
- Si este README y `AGENTS.md` divergen, prevalece `AGENTS.md`.

## Estado del proyecto al que dan soporte

El estado funcional actual del proyecto incluye:

- exploracion de razas de perros desde Dog CEO por medio de un backend proxy
- enriquecimiento historico por raza desde Wikipedia con fallback interno
- descarga de PDF por raza
- interfaz responsive con sidebar, busqueda, tabs y modal de imagen
- pruebas E2E con Playwright + Cucumber

## Skills instaladas

### `pdf`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/pdf/SKILL.md`
- Uso esperado:
  - revisar la salida del endpoint `GET /api/breeds/:breed/report.pdf`
  - validar legibilidad, estructura y formato del PDF generado
  - apoyar revisiones de layout cuando el reporte cambie

### `playwright`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/playwright/SKILL.md`
- Uso esperado:
  - automatizar flujos reales del frontend
  - inspeccionar estados responsive de sidebar, tabs, grilla y dialogos
  - apoyar pruebas E2E y validaciones manuales navegables
  - servir como fallback operativo para automatizacion web cuando no exista un MCP dedicado

### `find-skills`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/find-skills/SKILL.md`
- Uso esperado:
  - descubrir skills adicionales para UI, UX, accesibilidad y despliegue
  - evaluar rapidamente si conviene agregar nuevas capacidades al repo
  - apoyar decisiones de extension sin depender de memoria o busqueda manual

### `web-design-guidelines`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/web-design-guidelines/SKILL.md`
- Uso esperado:
  - auditar interfaces y componentes visuales del frontend
  - revisar consistencia de layout, jerarquia visual y buenas practicas de UI
  - apoyar futuros refactors de experiencia y presentacion

### `accessibility`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/accessibility/SKILL.md`
- Uso esperado:
  - revisar accesibilidad de interacciones, contraste y enfoque visible
  - apoyar mejoras WCAG 2.1 en componentes de frontend
  - complementar revisiones UI con criterios de accesibilidad operables

### `notion-knowledge-capture`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/notion-knowledge-capture/SKILL.md`
- Uso esperado:
  - documentar arquitectura, decisiones, runbooks y estado del proyecto en Notion
  - consolidar cierres de iteracion y documentacion funcional/tecnica
  - enlazar el conocimiento persistido en Notion con la documentacion versionada del repo
- Nota:
  - en esta sesion no hay un MCP de Notion expuesto como herramienta nativa, por lo que puede requerirse automatizacion de navegador o una accion minima del usuario dentro de Notion

### `security-threat-model`

- Estado: instalada
- Ubicacion local: `/mnt/c/workspace/poc/SDD/.codex/skills/security-threat-model/SKILL.md`
- Uso esperado:
  - modelar amenazas del backend proxy y de la superficie de descarga de PDF
  - revisar limites de confianza entre frontend, backend y servicios externos
  - registrar mitigaciones antes de una entrega formal

## Criterio de uso

Estas skills se eligieron en funcion del prompt y de la arquitectura real definida en:

- `/mnt/c/workspace/poc/SDD/.codex/prompts/project.md`
- `/mnt/c/workspace/poc/SDD/.codex/architecture/architecture.md`

Cobertura buscada:

- calidad y validacion de artefactos PDF
- automatizacion navegable y evidencia visual del frontend
- descubrimiento de nuevas skills del ecosistema
- auditoria de lineamientos de diseño web
- apoyo a revisiones de accesibilidad
- documentacion estructurada del proyecto en Notion
- evaluacion de riesgos de seguridad cuando se solicite explicitamente

## MCPs o integraciones recomendadas

Los conectores que mas valor aportarian a este proyecto son:

1. `notion`
   - para capturar y mantener la base documental del proyecto
   - URL de referencia: `https://mcp.notion.com/mcp`

2. `playwright`
   - para recorridos automatizados, evidencia visual y debugging UI

3. `github`
   - util si el repositorio se publica y luego se conecta a issues, PRs o CI

4. `browserbase` o equivalente de navegador remoto
   - util para revisiones visuales mas estables cuando Playwright local no sea suficiente

## Nota operativa

Estas skills quedaron versionadas dentro del proyecto para que el flujo de trabajo sea reproducible y no dependa de instalaciones globales implicitas. Cuando una CLI externa instala una skill fuera de `.codex/skills/`, debe copiarse o reflejarse aqui para mantener la fuente de verdad del repo.
