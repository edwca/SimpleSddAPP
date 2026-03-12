# Project Overview

## Resumen

Search Dog es una aplicacion web creada con enfoque SDD para explorar razas de perros desde una sola ficha informativa por raza. La UI consume exclusivamente un backend propio, que centraliza integraciones externas, sirve la imagen principal, compone la historia y genera un PDF descargable por raza.

## Objetivo del producto

- ofrecer exploracion rapida de razas desde una experiencia visual moderna
- desacoplar el frontend de proveedores externos
- enriquecer la navegacion con historia contextual por raza
- simplificar la lectura con una sola imagen protagonista
- permitir descargar un reporte compacto por raza

## Usuarios objetivo

- personas interesadas en explorar razas de perros
- usuarios que priorizan navegacion visual simple y rapida
- equipos tecnicos que requieren una referencia de integracion frontend/backend con SDD

## Funcionalidades implementadas

- listado de razas en sidebar fijo o drawer mobile
- busqueda de razas por nombre, id y subrazas
- seleccion automatica de una raza inicial
- spotlight principal con una imagen representativa por raza
- historia por raza integrada a la misma vista
- descarga de la imagen principal y modal para ampliarla
- descarga de PDF por raza
- manejo visible de estados de carga, vacio y error

## Alcance actual

El sistema cubre la experiencia principal de exploracion y consulta. No incluye autenticacion, persistencia de usuario, favoritos ni administracion de contenido.

## Principios de producto

- simplicidad de uso
- tiempo de respuesta razonable
- consistencia visual entre desktop y mobile
- aislamiento del frontend respecto de servicios externos
