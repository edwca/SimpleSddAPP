# UI Spec

## Layout principal

- Sidebar permanente a la izquierda en desktop
- Drawer temporal en mobile con boton flotante para abrir navegacion
- Contenido principal a la derecha con encabezado editorial, acciones y spotlight principal por raza
- Fondo con gradientes suaves, superficies translucidas y estetica minimalista inspirada en interfaces premium

## Componentes

- `Sidebar`: contenedor lateral con marca del producto, texto descriptivo, buscador y lista de razas
- `BreedList`: lista navegable de razas con estado seleccionado y subrazas visibles
- `BreedSpotlight`: panel principal con imagen representativa, acciones y perfil narrativo
- `ImageViewerDialog`: modal para abrir la imagen en grande y acceder a la URL original
- `LoadingSkeleton`: placeholders para lista y spotlight durante carga

## Acciones principales

- seleccionar raza desde la lista o el buscador
- descargar la imagen representativa
- descargar el PDF con el boton `Descargar PDF`
- ampliar la imagen principal

## Comportamientos

- Seleccion automatica de la primera raza disponible cuando termina de cargar el catalogo
- Busqueda con `Autocomplete` usando nombre, id y subrazas
- Carga de la imagen representativa desde el endpoint interno `featured-image`
- Uso de `useDeferredValue` para suavizar la carga de contenido al cambiar de raza
- Uso de `startTransition` para reducir bloqueo perceptible al cambiar la seleccion
- Indicador lineal visible cuando la historia se esta refrescando y spinner centrado mientras la imagen principal termina de cargar
- Estados de carga, vacio y error para lista, spotlight e historia
- Spotlight responsive con una columna en mobile y dos paneles en pantallas amplias
- Dialogo modal de imagen con fondo oscuro y enlace para abrir la imagen original
- La imagen principal se presenta con recorte uniforme y proporcion fija para mantener una ficha mas compacta y consistente
- La tarjeta inferior de la imagen muestra un texto introductorio breve derivado de la historia o de los metadatos de la raza

## Lineamientos visuales

- Inspiracion editorial minimalista con enfoque premium y limpio
- Paleta principal basada en tonos pizarra, verde azulado y blancos translcidos
- Tipografia `Sora` + `Manrope`
- Bordes redondeados moderados, sombras suaves y transparencias ligeras
- Transiciones cortas en sidebar, spotlight e interacciones de navegacion
