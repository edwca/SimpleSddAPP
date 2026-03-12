# Product Spec

## Objetivo del proyecto

Construir una aplicacion web que permita explorar razas de perros desde una sola vista informativa por raza, con una imagen representativa, contexto historico y acciones de descarga bajo una experiencia moderna, limpia y consistente.

## Usuarios objetivo

- Personas curiosas por conocer razas de perros desde una interfaz visual simple
- Usuarios que necesitan navegar rapidamente por un catalogo amplio de razas sin recorrer galerias extensas
- Equipos tecnicos que quieran una referencia de integracion frontend/backend bajo SDD

## Funcionalidades principales

- Listar razas de perros en un sidebar lateral fijo en desktop y drawer en mobile
- Buscar razas por nombre, id o subrazas desde un `Autocomplete`
- Seleccionar una raza y visualizar una sola imagen representativa servida por el backend
- Consultar la historia de la raza en la misma vista principal, sin tabs separados
- Ampliar la imagen principal en un dialogo modal
- Descargar la imagen representativa
- Descargar un PDF por raza con resumen historico y enlaces a imagenes
- Mostrar estados de carga, vacio y error de forma visible

## Requerimientos funcionales

- El sistema debe obtener el catalogo de razas desde un backend interno
- El sistema debe seleccionar automaticamente la primera raza disponible cuando cargue el catalogo
- El sistema debe permitir cambiar la raza activa desde lista o buscador
- El sistema debe obtener la imagen representativa de la raza seleccionada desde el backend
- El sistema debe obtener la historia de la raza seleccionada desde el backend
- El sistema debe permitir descargar la imagen representativa activa
- El sistema debe permitir descargar un PDF por raza desde la interfaz principal
- El frontend no debe consumir directamente servicios externos
- La aplicacion debe exponer endpoints internos para razas, imagenes, imagen destacada, historia y PDF

## Requerimientos no funcionales

- TypeScript estricto en backend y frontend
- Arquitectura mantenible con separacion clara de responsabilidades
- Seguridad basica en backend con `helmet`, `cors`, `express-rate-limit` y manejo centralizado de errores
- Estilo visual minimalista con superficies premium, jerarquia editorial y buen comportamiento responsive
- Codigo validado con ESLint y Prettier
- Base de pruebas E2E con Playwright, Cucumber y `playwright-bdd`
- Timeouts y errores de servicios externos deben quedar encapsulados en el backend

## Experiencia de usuario

- La interfaz debe priorizar simplicidad, lectura rapida y foco en una sola raza a la vez
- El sidebar debe facilitar encontrar una raza incluso dentro de un catalogo grande
- La zona principal debe destacar la raza activa, su imagen principal y las acciones principales
- Los estados de carga deben evitar saltos bruscos y mostrar progreso visible
- La aplicacion debe comportarse correctamente en desktop y mobile
- La descarga de imagen y PDF no deben romper el flujo principal de exploracion
