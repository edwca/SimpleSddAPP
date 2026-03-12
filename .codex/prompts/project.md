# Bootstrap de Proyecto - Search Dog

Este bootstrap ya fue materializado en el repositorio actual. Cualquier trabajo posterior debe preservar la arquitectura y las capacidades ya implementadas antes de extenderlas.

## Estado actual implementado

El proyecto ya cuenta con:

- backend Express en TypeScript que consume Dog CEO y Wikipedia
- frontend React + Vite + Material UI + React Query
- listado y busqueda de razas en sidebar/drawer
- spotlight principal con una imagen representativa por raza
- historia integrada por raza con fallback interno
- descarga de imagen principal a traves del backend
- exportacion PDF por raza
- pruebas E2E con Playwright, Cucumber y `playwright-bdd`

Convenciones de continuidad:

- mantener `AGENTS.md`, `.codex/specs/*`, `.codex/architecture/architecture.md` y `.codex/skills/README.md` sincronizados con el comportamiento real
- documentar en español cualquier cambio funcional, operativo o arquitectonico
- preservar la regla de que el frontend nunca consume directamente servicios externos

Actúa como un **arquitecto de software senior** y genera un proyecto completo desde cero en el directorio actual, el cual se encuentra vacío.

El proyecto debe desarrollarse siguiendo **Spec Driven Development (SDD)**.

Todos los archivos generados deben estar **en idioma español**.

## Convencion local de skills

Este proyecto usa `.codex/skills/` como fuente local de skills.

Reglas:

- revisar primero `.codex/skills/` antes de depender de instalaciones globales
- si existe una skill local con el mismo nombre que una global, priorizar la version local
- usar `.codex/skills/README.md` como manifiesto operativo del proyecto
- no asumir autodeteccion por presencia de carpeta solamente; explicitar esta convencion cuando haga falta en la sesion

---

# Objetivo del Proyecto

Crear una aplicación web que permita **explorar razas de perros** desde una **vista informativa única** por raza, con imagen principal, contexto histórico y descargas apoyadas por un backend proxy.

API pública a utilizar:

https://dog.ceo/dog-api/

La aplicación debe mostrar:

- Un **sidebar lateral** con la lista de razas de perros
- Un **panel principal** con una **imagen representativa** y la **historia contextual** de la raza seleccionada
- Interfaz moderna, minimalista y limpia bajo el branding **Search Dog**

---

# Stack Tecnológico Obligatorio

## Frontend

- React
- TypeScript
- Vite
- Material UI
- React Query

## Backend

- Node.js
- Express
- TypeScript
- Axios

---

# Arquitectura General del Sistema

Browser
↓
React Frontend
↓
Node.js Backend (API Proxy)
↓
Dog CEO API

Regla importante:

El **frontend nunca debe consumir directamente la API pública**.

El **backend actuará como proxy**.

---

# FASE 1 — Crear estructura base del proyecto

Crear las siguientes carpetas:

.codex/
.codex/prompts
.codex/specs
.codex/architecture

backend/
frontend/
scripts/
docker/
tests/

Crear también:

README.md
.gitignore
package.json

---

# FASE 2 — Crear especificaciones (SDD)

Generar los siguientes archivos:

.codex/specs/product-spec.md
.codex/specs/api-spec.md
.codex/specs/ui-spec.md
.codex/architecture/architecture.md

## product-spec.md

Debe describir:

- objetivo del proyecto
- usuarios objetivo
- funcionalidades principales
- requerimientos funcionales
- requerimientos no funcionales
- experiencia de usuario

---

## api-spec.md

Definir endpoints internos:

GET /api/breeds
GET /api/breeds/:breed/images
GET /api/breeds/:breed/featured-image

Mapear hacia:

https://dog.ceo/api/breeds/list/all
https://dog.ceo/api/breed/{{breed}}/images

Definir estructura JSON de respuesta.

---

## ui-spec.md

Definir layout:

Sidebar izquierda
Contenido principal derecha

Componentes:

- Sidebar
- BreedList
- BreedSpotlight
- ImageViewerDialog
- LoadingSkeleton

Comportamientos:

- vista unica por raza
- descarga de imagen representativa
- modal de ampliacion
- responsive layout

---

## architecture.md

Definir arquitectura:

### Arquitectura Frontend

Feature-based architecture

src/
app/
features/
components/
hooks/
services/
styles/
types/

### Arquitectura Backend

Layered architecture

routes
controllers
services
clients
middleware
config

---

# FASE 3 — Seguridad y Configuración de Entorno

Implementar variables de entorno utilizando archivos `.env`.

Crear:

backend/.env.example
frontend/.env.example

Ejemplo backend:

PORT=3000
API_BASE_URL=https://dog.ceo/api
RATE_LIMIT_MAX=100

Ejemplo frontend:

VITE_API_URL=http://localhost:3000/api

Agregar `.env` al `.gitignore`.

Nunca subir secretos al repositorio.

---

# FASE 4 — Generar Backend

Crear proyecto Node.js en:

backend/

Stack:

- Node.js
- Express
- TypeScript
- Axios

Estructura:

backend/src

routes/
controllers/
services/
clients/
middleware/
config/

Endpoints internos:

GET /api/breeds
GET /api/breeds/:breed/images

Consumir API externa:

https://dog.ceo/api/breeds/list/all
https://dog.ceo/api/breed/{{breed}}/images

Implementar buenas prácticas de seguridad:

- helmet
- cors
- express-rate-limit
- axios timeout
- middleware centralizado de manejo de errores
- uso de variables `.env`

---

# FASE 5 — Generar Frontend

Crear proyecto en:

frontend/

Stack:

- React
- TypeScript
- Vite
- Material UI
- React Query

Estructura:

src/

app/
features/
components/
hooks/
services/
styles/
types/

Componentes principales:

- Sidebar
- BreedList
- ImageGrid
- ImageCard
- LoadingSkeleton

Funcionalidades:

- mostrar lista de razas
- seleccionar raza
- mostrar imágenes
- grid responsive
- lazy loading
- skeleton loading

Consumir API desde:

VITE_API_URL

---

# FASE 6 — Calidad de Código

Configurar:

- eslint
- prettier
- husky
- lint-staged

Reglas:

- TypeScript estricto
- evitar any
- formato consistente

---

# FASE 7 — Testing E2E con BDD

Implementar pruebas end-to-end utilizando:

- Playwright
- Cucumber
- playwright-bdd
- TypeScript

Estructura:

tests/

features/
browse-dog-breeds.feature

steps/
browse-dog-breeds.steps.ts

support/
world.ts
hooks.ts

playwright.config.ts

Dependencias:

@playwright/test
playwright-bdd
@cucumber/cucumber
ts-node
typescript

Feature inicial:

Feature: Navegación de razas de perros

Scenario: Visualizar imágenes de una raza
Given que el usuario abre la aplicación
When selecciona la raza "husky"
Then debería ver imágenes de perros de esa raza

Configuración Playwright:

baseURL: http://localhost:5173

Scripts en package.json:

test:e2e
test:e2e:ui

Ejemplo:

npm run test:e2e

Las pruebas deben ejecutarse en **modo headless por defecto**.

---

# FASE 8 — Documentación

Generar `README.md` explicando:

- descripción del proyecto
- arquitectura
- stack tecnológico
- estructura del proyecto
- cómo ejecutar el proyecto

Comandos esperados:

npm install
npm run dev

---

# Requisitos de Calidad

El código generado debe seguir:

- Clean Architecture
- separación de responsabilidades
- tipado estricto en TypeScript
- mínimas dependencias innecesarias
- estructura mantenible

---

# Resultado Esperado

El proyecto completo debe poder ejecutarse localmente usando:

npm install
npm run dev

Generar únicamente archivos necesarios para un proyecto funcional y limpio.
