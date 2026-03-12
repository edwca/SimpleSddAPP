# Frontend y UX

## Objetivo de la interfaz

Permitir explorar rapidamente un catalogo amplio de razas desde una sola vista informativa, sin tabs ni galerias extensas.

## Layout

- sidebar permanente en desktop
- drawer temporal en mobile
- encabezado principal con resumen y acciones
- spotlight principal con imagen protagonista y bloque narrativo

## Componentes principales

- `Sidebar`
- `BreedList`
- `BreedSpotlight`
- `ImageViewerDialog`
- `LoadingSkeleton`

## Comportamientos clave

- seleccion automatica de la primera raza disponible
- busqueda con `Autocomplete`
- carga de imagen representativa desde backend
- progreso visible cuando hay refetch de historia
- mensajes de error y vacio por seccion
- modal para ampliar la imagen principal y abrir la URL original
- boton para descargar la imagen representativa
- boton para descargar el PDF por raza

## Lineamientos visuales

- inspiracion minimalista premium con transparencias suaves
- paleta pizarra + verde azulado + blancos translcidos
- tipografia `Sora` + `Manrope`
- superficies suaves con sombras y transparencias ligeras
- transiciones cortas en sidebar, spotlight y modal

## Resultado esperado

La experiencia debe sentirse directa, limpia y mas premium tanto en desktop como en mobile, sin exponer al usuario detalles de integracion tecnica.
