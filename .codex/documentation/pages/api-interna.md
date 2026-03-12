# API Interna

## Base URL local

`http://localhost:3000`

## Endpoints

### `GET /health`

Uso:

- healthcheck para desarrollo local y pruebas E2E

Respuesta:

```json
{
  "estado": "ok"
}
```

### `GET /api/breeds`

Uso:

- obtener el catalogo de razas disponible para la UI

Respuesta:

```json
{
  "datos": [
    {
      "id": "husky",
      "nombre": "Husky",
      "subRazas": []
    }
  ],
  "meta": {
    "total": 1
  }
}
```

### `GET /api/breeds/:breed/images`

Uso:

- obtener imagenes de la raza activa

Respuesta:

```json
{
  "datos": {
    "raza": {
      "id": "husky",
      "nombre": "Husky"
    },
    "imagenes": ["https://images.dog.ceo/breeds/husky/n02110185_10047.jpg"]
  },
  "meta": {
    "total": 1
  }
}
```

### `GET /api/breeds/:breed/history`

Uso:

- obtener historia enriquecida de la raza seleccionada

Respuesta:

```json
{
  "datos": {
    "raza": {
      "id": "husky",
      "nombre": "Husky"
    },
    "historia": "El husky siberiano se desarrollo en Siberia junto al pueblo chukchi...",
    "fuente": {
      "nombre": "Wikipedia ES",
      "url": "https://es.wikipedia.org/wiki/Husky_siberiano"
    }
  }
}
```

### `GET /api/breeds/:breed/report.pdf`

Uso:

- descargar un reporte PDF con historia y enlaces de imagenes

Respuesta:

- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename="{breed}-reporte.pdf"`

### `GET /api/breeds/:breed/featured-image`

Uso:

- servir la imagen representativa de la raza activa desde el backend
- permitir descarga directa con `?download=1`

Respuesta:

- binario de imagen
- `Content-Type: image/*` cuando el proveedor lo informa
- `Content-Disposition: attachment; filename="{breed}-imagen-principal.jpg"` cuando se descarga

## Reglas de backend

- validacion de `breed` con letras minusculas y guiones
- orden alfabetico de razas por `nombre`
- fallback interno cuando Wikipedia no devuelve contenido util
- limitacion a 8 enlaces de imagen dentro del PDF para mantenerlo compacto
- proxy de imagen principal para desacoplar la UI de la URL remota

## Seguridad y errores

- `cors` restringido por `ALLOWED_ORIGIN`
- `express-rate-limit` aplicado sobre `/api`
- codigos de error esperados:
  - `BAD_REQUEST`
  - `BREED_NOT_FOUND`
  - `UPSTREAM_ERROR`
  - `FORBIDDEN_ORIGIN`
