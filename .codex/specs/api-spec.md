# API Spec

## Objetivo

Definir la API interna consumida por el frontend. El backend traduce, valida y normaliza la informacion proveniente de Dog CEO y Wikipedia.

## Consideraciones generales

- Base interna para el frontend: `http://localhost:3000/api`
- Endpoint operativo adicional: `GET /health`
- Seguridad aplicada sobre `/api`: `helmet`, `cors` con lista permitida y `express-rate-limit`
- Validacion de raza: solo letras minusculas y guiones (`^[a-z-]+$`)

## Endpoint: GET /health

### Objetivo

Exponer un healthcheck simple para ejecucion local y pruebas automatizadas.

### Respuesta

```json
{
  "estado": "ok"
}
```

## Endpoint: GET /api/breeds

### Origen externo

`GET https://dog.ceo/api/breeds/list/all`

### Respuesta interna

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

### Reglas

- El backend ordena alfabeticamente por `nombre`
- Cada raza se expone con `id`, `nombre` formateado y `subRazas`

## Endpoint: GET /api/breeds/:breed/images

### Origen externo

`GET https://dog.ceo/api/breed/{{breed}}/images`

### Respuesta interna

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

### Reglas

- La raza solicitada se devuelve normalizada en `datos.raza`
- `meta.total` representa la cantidad de imagenes disponibles

## Endpoint: GET /api/breeds/:breed/featured-image

### Objetivo

Servir la imagen representativa de la raza seleccionada a traves del backend para que la UI no dependa del URL externo de Dog CEO.

### Comportamiento

- Responde binario de imagen
- Usa la primera imagen disponible de la raza como imagen representativa
- Si se llama con `?download=1`, responde con `Content-Disposition: attachment`

### Respuesta

- `Content-Type: image/*` cuando Dog CEO informa el mime type
- `Content-Disposition: attachment; filename="{breed}-imagen-principal.jpg"` cuando `download=1`

### Reglas

- El backend reutiliza el catalogo de imagenes de Dog CEO para elegir la primera disponible
- Si la raza no tiene imagenes, responde error `FEATURED_IMAGE_NOT_FOUND`
- El backend expone `Cache-Control` de corto plazo para evitar consultas redundantes inmediatas

## Endpoint: GET /api/breeds/:breed/history

### Origen externo

- `GET https://es.wikipedia.org/w/api.php`
- `GET https://en.wikipedia.org/w/api.php`
- `GET https://{lang}.wikipedia.org/api/rest_v1/page/summary/{title}`

### Respuesta interna

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

### Reglas

- El backend valida primero que la raza exista en el catalogo interno
- Se prueban titulos alternativos para mejorar el match en Wikipedia
- Si Wikipedia no devuelve un resumen util, se usa un fallback interno por raza o un texto generico

## Endpoint: GET /api/breeds/:breed/report.pdf

### Objetivo

Generar un PDF descargable con la raza seleccionada, su historia, metadata basica y enlaces a imagenes de referencia.

### Respuesta

- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename="{breed}-reporte.pdf"`
- Cuerpo binario del PDF

### Reglas

- El PDF combina la salida de `history` e `images`
- La fecha se formatea con locale `es-CL`
- Solo se listan hasta 8 enlaces de imagen para mantener el artefacto compacto
- El frontend puede descargar este reporte sin exponer proveedores externos

## Manejo de errores

### Error de validacion

```json
{
  "error": {
    "codigo": "BAD_REQUEST",
    "mensaje": "La raza solicitada no es valida."
  }
}
```

### Error de raza inexistente

```json
{
  "error": {
    "codigo": "BREED_NOT_FOUND",
    "mensaje": "La raza solicitada no existe en el catalogo disponible."
  }
}
```

### Error de upstream

```json
{
  "error": {
    "codigo": "UPSTREAM_ERROR",
    "mensaje": "No fue posible consultar la API externa."
  }
}
```

### Error de imagen representativa no disponible

```json
{
  "error": {
    "codigo": "FEATURED_IMAGE_NOT_FOUND",
    "mensaje": "La raza seleccionada no tiene una imagen representativa disponible."
  }
}
```

### Error de origen no permitido

```json
{
  "error": {
    "codigo": "FORBIDDEN_ORIGIN",
    "mensaje": "El origen solicitado no esta permitido por CORS."
  }
}
```
