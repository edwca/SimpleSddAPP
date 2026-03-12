# Decision Log

## Decision 1: usar backend proxy como punto unico de integracion

Racional:

- evita acoplar la UI a Dog CEO y Wikipedia
- centraliza validacion, seguridad y manejo de errores
- simplifica contratos consumidos por el frontend

Impacto:

- mayor control sobre respuestas y fallback
- mas facilidad para evolucionar proveedores externos

## Decision 2: enriquecer historia de raza en backend

Racional:

- el matching con Wikipedia requiere logica de aliases, busqueda y fallback
- esa complejidad no debe exponerse al cliente

Impacto:

- el frontend recibe una estructura simple y consistente

## Decision 3: generar PDF en backend

Racional:

- el documento depende de datos compuestos de historia e imagenes
- mantener la generacion en backend evita mover logica documental al navegador

Impacto:

- la UI solo dispara la descarga
- el backend conserva control del formato del artefacto

## Decision 4: versionar la base documental dentro de `.codex`

Racional:

- permite trazabilidad junto al codigo
- habilita captura posterior en Notion sin reconstruir contexto
- mantiene un punto de verdad aunque no haya integracion activa con Notion

Impacto:

- cualquier cambio relevante debe actualizar tanto las specs canonicas como `.codex/documentation/`

## Decision 5: simplificar la UX a un spotlight unico por raza

Racional:

- la galeria extensa y los tabs agregaban sobrecarga a una consulta que el usuario podia resolver con una sola imagen protagonista y contexto inmediato
- la vista unica mejora foco, lectura y consistencia visual

Impacto:

- menos complejidad en la UI principal
- menor cantidad de interacciones necesarias para comprender una raza

## Decision 6: servir la imagen representativa desde el backend

Racional:

- alinear la implementacion con la regla de que el frontend no dependa de proveedores externos
- habilitar descarga directa de la imagen activa desde un endpoint interno

Impacto:

- nuevo endpoint `GET /api/breeds/:breed/featured-image`
- mejora del desacoplamiento entre la UI y Dog CEO
