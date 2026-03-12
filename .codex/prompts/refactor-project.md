Actúa como un arquitecto de software senior, frontend engineer senior, backend engineer senior y especialista DevOps.

Debes trabajar sobre el repositorio actual del proyecto, el cual YA fue bootstrappeado y materializado previamente. Antes de modificar cualquier cosa, analiza el estado actual del proyecto, su arquitectura, documentación y convenciones internas. Debes preservar lo que ya funciona y solo refactorizar o cambiar arquitectura si existe una justificación técnica clara. Mantén sincronizados los artefactos de documentación y especificación del proyecto. Todo debe mantenerse en español. También debes respetar la convención local de skills bajo `.codex/skills/` antes de depender de instalaciones globales. :contentReference[oaicite:1]{index=1}

# Objetivo general

Mejorar funcional, visual y operativamente la aplicación actual de exploración de razas de perros, modernizando el frontend, simplificando la experiencia de usuario, manteniendo una arquitectura limpia, actualizando la documentación y dejando el proyecto preparado para despliegue en GitHub, Vercel y Render.

---

# Forma de trabajo obligatoria

Antes de ejecutar cambios, sigue este enfoque:

1. Analiza el proyecto actual completo.
2. Crea un plan estratégico por fases.
3. Identifica riesgos, dependencias, impacto técnico y cambios arquitectónicos necesarios.
4. Ejecuta los cambios por etapas, validando que cada etapa no rompa lo existente.
5. Documenta todo cambio funcional, técnico y operativo.
6. Al finalizar, entrega un resumen ejecutivo con:
   - cambios realizados
   - decisiones técnicas
   - skills y MCP instalados
   - despliegues realizados
   - pendientes o recomendaciones

No hagas cambios desordenados ni improvisados. Primero planifica, luego ejecuta.

---

# Restricciones importantes

- No debes eliminar capacidades existentes sin justificación.
- Si decides cambiar arquitectura, debes explicar por qué, qué cambia y qué beneficios aporta.
- Debes priorizar reutilizar el código existente antes que rehacer todo.
- No debes modificar skills ya existentes en el proyecto; solo agregar nuevas si son necesarias.
- No debes modificar MCP existentes; solo agregar los nuevos requeridos.
- Toda la documentación nueva o modificada debe quedar en español.
- Debes mantener actualizado el comportamiento real del proyecto con:
  - `.codex/`
  - `README.md`
  - `AGENTS.md`
  - documentación técnica y operativa relacionada

---

# FASE 1 — Diagnóstico inicial del proyecto

Realiza un análisis completo del repositorio actual.

Debes revisar al menos:

- estructura frontend
- estructura backend
- componentes visuales actuales
- flujo de navegación
- uso actual de tabs, modales, sidebar y vistas
- branding actual
- dependencias instaladas
- documentación existente
- `.codex/specs/`
- `.codex/architecture/`
- `.codex/skills/`
- `README.md`
- `AGENTS.md`

Como resultado, genera un plan estratégico técnico por fases indicando:

- qué se mantendrá
- qué se simplificará
- qué se refactorizará
- qué se rediseñará
- qué skills y MCP faltan
- si conviene o no ajustar arquitectura

---

# FASE 2 — Simplificación funcional del frontend

Debes aplicar los siguientes cambios funcionales al sitio web:

## 2.1 Cambiar la forma de mostrar el contenido

Actualmente no quiero mostrar una lista o colección extensa de imágenes por raza.

Nuevo comportamiento esperado:

- por cada raza o categoría, mostrar solo una imagen representativa de la mascota
- junto a esa imagen, mostrar una sección de contenido descriptivo sobre la historia o contexto de la raza
- la experiencia debe ser más simple, limpia y enfocada en una sola vista informativa por raza
- agregar un boton que permita descargar la imagen que se renderiza en pantalla

## 2.2 Eliminar elementos innecesarios

Debes eliminar o dejar de mostrar:

- el tab o sección separada que hoy muestra “historia” o contenido en pestañas, si existe
- el texto literal `"Affenpinscher Imagen ajustada y centrada"` o cualquier variante equivalente que se esté mostrando sobre o bajo las imágenes
- cualquier etiqueta redundante repetida en las cards o imágenes que no aporte valor al usuario

## 2.3 Cambio de naming / branding

Cambiar el nombre del sitio desde:

- `Dog Breed Browser`

hacia:

- `Search Dog`

Esto debe reflejarse en:

- header principal
- sidebar o drawer lateral
- títulos visibles
- metadatos del frontend si aplica
- textos relacionados de navegación o branding

---

# FASE 3 — Rediseño visual moderno

Quiero modernizar la aplicación porque actualmente el contenido, modales y vistas se ven poco atractivos.

## Objetivo visual

Aplicar un rediseño minimalista, moderno y limpio, con inspiración en:

- interfaces minimalistas
- presentación visual tipo Apple
- tratamiento visual estilo “Liquid Glass”, siempre que sea técnicamente viable y coherente con el stack actual

## Requisitos del rediseño

Debes revisar y mejorar al menos:

- layout general
- jerarquía visual
- tipografía
- espaciado
- cards
- modales
- paneles
- sidebar
- contenedores de imagen
- estados de loading
- interacción hover/focus
- responsive design
- consistencia visual general

## Resultado esperado

La aplicación debe sentirse:

- más moderna
- más minimalista
- más premium
- más limpia
- más consistente

Si para lograr esto conviene cambiar librerías visuales, estructura de componentes, sistema de estilos o arquitectura del frontend, puedes hacerlo, pero debes justificarlo.

---

# FASE 4 — Instalación y uso de skills para diseño

Necesito que instales esta skill:

```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills

Luego:

verifica si la instalación debe ser global o si conviene integrarla según la convención local del proyecto

revisa primero .codex/skills/ antes de agregar algo nuevo

usa la skill para identificar qué otras skills pueden ayudarnos específicamente a mejorar el diseño, UX, UI, refactor visual o experiencia frontend

recomienda las mejores skills aplicables al proyecto

instala solo las skills nuevas necesarias, sin modificar las existentes

documenta qué skill se agregó, para qué sirve y cómo se usa en este proyecto

Debes priorizar skills que ayuden en temas como:

diseño visual

refactor de frontend

mejora UX/UI

componentes

accesibilidad

estilado moderno

deploy si aplica

FASE 5 — Revisión de arquitectura

Evalúa si los cambios funcionales y visuales requieren ajustes de arquitectura.

Analiza específicamente:

si la arquitectura frontend actual sigue siendo adecuada

si el modelo actual de componentes favorece o dificulta el rediseño

si hay sobrecomplejidad innecesaria

si conviene reorganizar features, layout, vistas o servicios

si la obtención y presentación de datos puede simplificarse

Si determinas que sí conviene cambiar arquitectura:

realiza el cambio

mantén compatibilidad con lo ya implementado en lo posible

actualiza documentación técnica

actualiza specs y arquitectura en .codex/

FASE 6 — Actualización completa de documentación local

Después de los cambios, debes actualizar completamente:

.codex/

.codex/specs/*

.codex/architecture/architecture.md

.codex/skills/README.md

README.md

AGENTS.md

La documentación debe reflejar:

nueva experiencia de usuario

cambios visuales

cambios funcionales

cambios de branding

skills nuevas agregadas

MCP nuevos agregados

arquitectura actualizada

instrucciones de desarrollo y despliegue

No dejes documentación desalineada con el código real.

FASE 7 — Subir código a GitHub usando MCP

Posteriormente, sube todo el código al siguiente repositorio:

https://github.com/edwca/SimpleSddAPP

Debes hacerlo utilizando GitHub MCP.

Primero analiza si:

el repositorio ya existe y debe usarse tal cual

debes conectarlo al repo local actual

hace falta inicializar o ajustar remote

hace falta crear ramas o preparar un push ordenado

Luego:

instala o configura GitHub MCP si aún no está disponible

úsalo para publicar el código

valida que el repositorio quede actualizado con los cambios realizados

No reemplaces ni rompas configuraciones existentes innecesariamente.

FASE 8 — Analizar Vercel: MCP vs skills

Antes de desplegar, realiza un análisis técnico breve pero claro sobre qué conviene más en este punto:

instalar y usar Vercel MCP

usar una skill de Vercel

usar ambos

o mantener uno como principal y otro como apoyo

Debes comparar al menos:

utilidad práctica para este proyecto

capacidad de deploy

automatización

mantenimiento

integración con el flujo actual de Codex

conveniencia operativa

Luego toma una decisión razonada.

FASE 9 — Deploy frontend en Vercel Hobby

Después del análisis anterior:

instala/configura la herramienta elegida para Vercel

despliega el frontend en Vercel Hobby

deja documentado:

qué se instaló

cómo se configuró

qué comando o flujo se utilizó

URL resultante del despliegue

variables de entorno necesarias si aplica

FASE 10 — Deploy backend en Render

Luego realiza lo mismo con Render para el backend.

Debes:

instalar o configurar Render API MCP

preparar el backend para despliegue en Render

desplegarlo

dejar documentado:

servicio creado

configuración usada

variables de entorno

URL final del backend

ajustes realizados para producción

Estado esperado de herramientas al final

Para esta altura, el repositorio local debe quedar preparado con al menos:

Herramienta Propósito
GitHub MCP  crear repo / push
Vercel MCP  deploy frontend
Render API MCP  deploy backend

Además de todas las skills nuevas necesarias para el proyecto.

Importante:

no modificar las skills actuales que ya están siendo usadas

no modificar MCP existentes

solo agregar lo que falte

documentar claramente cada incorporación

Entregables obligatorios

Al finalizar, entrega:

1. Resumen ejecutivo

qué cambió

qué se simplificó

qué se modernizó

qué se desplegó

2. Plan ejecutado

fases completadas

decisiones técnicas tomadas

riesgos encontrados

cómo se resolvieron

3. Resultado técnico

arquitectura final

skills instaladas

MCP instalados

repositorio GitHub actualizado

frontend desplegado en Vercel

backend desplegado en Render

4. Documentación actualizada

Confirmar qué archivos fueron actualizados y qué quedó documentado.

Criterios de aceptación

Se considerará completado cuando:

el sitio ya no muestre múltiples imágenes por raza, sino una sola imagen representativa

exista una sección descriptiva integrada sobre la raza

se haya eliminado el tab innecesario de historia/contenido

se haya eliminado el texto redundante en imágenes

el nombre visible del sitio sea Search Dog

el diseño visual sea claramente más moderno, minimalista y atractivo

se hayan instalado nuevas skills útiles sin afectar las existentes

el código haya sido subido a GitHub con GitHub MCP

el frontend esté desplegado en Vercel Hobby

el backend esté desplegado en Render

.codex/, README.md y AGENTS.md estén completamente actualizados

Instrucción final de ejecución

No respondas con teoría general. Ejecuta el trabajo por fases, mostrando primero el diagnóstico y plan estratégico, luego implementando cada etapa de forma ordenada hasta completar el objetivo.


## Por qué esta versión es mejor

Porque tu prompt original mezclaba objetivos de producto, rediseño, instalación de skills, decisiones de arquitectura, GitHub, Vercel, Render y documentación en un solo bloque. Esta versión separa todo en fases, define restricciones, entregables y criterios de aceptación, y obliga a Codex a trabajar con un orden lógico.

Además, incorpora correctamente el contexto importante del proyecto ya materializado: preservar arquitectura y capacidades existentes, mantener la documentación sincronizada y respetar `.codex/skills/` como convención local. :contentReference[oaicite:2]{index=2}

## Recomendación extra

Para que Codex trabaje todavía mejor, conviene acompañar este prompt con un segundo prompt corto de “modo de ejecución”, por ejemplo:

```md
Reglas adicionales:
- Antes de cambiar código, muestra el diagnóstico y plan por fases.
- No hagas cambios destructivos sin justificar impacto.
- Mantén commits lógicos y agrupados por fase si el entorno lo permite.
- Actualiza documentación inmediatamente después de cada cambio relevante.
- Si detectas inconsistencias entre documentación y código, corrígelas.
- Si una herramienta MCP o skill no está disponible, indícalo claramente y propone el siguiente mejor camino sin bloquear el resto del trabajo.

Si quieres, te lo convierto en una versión aún más “agresiva para ejecución en Codex”, optimizada para que tome acción sin desviarse.

Fuentes