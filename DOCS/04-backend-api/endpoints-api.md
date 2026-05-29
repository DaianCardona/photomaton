# Endpoints de la API (REST)

Especificación orientativa. Base URL: `https://api.decabox.<dominio>` (app CapRover `decabox-api`).
Autenticación: JWT (dispositivo o admin) salvo en endpoints públicos de galería. Ver [auth](autenticacion-y-roles.md).

## Salud

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/health` | — | Estado del servicio (usado por la app para detectar conexión) |

## Contenido web (tipos de evento)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/event-types?lang=es` | — | Lista de tipos de evento con su contenido en el idioma dado |
| GET | `/event-types/:slug?lang=es` | — | Contenido de un tipo (bodas, comuniones…) |
| POST | `/event-types` | admin | Crear tipo |
| PUT | `/event-types/:id` | admin | Editar tipo + traducciones + bloques |
| DELETE | `/event-types/:id` | admin | Borrar/desactivar |

Respuesta de ejemplo (`GET /event-types/bodas?lang=es`):
```json
{
  "slug": "bodas",
  "lang": "es",
  "title": "Bodas",
  "subtitle": "...",
  "description1": "...",
  "features": [{ "title": "...", "body": "...", "icon": "camera" }],
  "benefits": ["...", "..."],
  "cta": { "title": "...", "text": "..." }
}
```

## Eventos del fotomatón

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/events` | device | Crear/registrar un evento (devuelve `code`) |
| GET | `/events/:id` | device/admin | Datos del evento |
| PATCH | `/events/:id` | admin | Editar (fecha, caducidad de galería…) |

## Ingesta de medios

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/events/:id/sessions` | device | Crear sesión (devuelve `code`) |
| POST | `/events/:id/media` | device | Subir medio (multipart) **o** solicitar URL firmada |
| POST | `/media/:id/complete` | device | Confirmar subida (si se usó URL firmada) |

- `POST /events/:id/media` acepta el **uuid local** del medio como `id` → **upsert idempotente** (reintentos no duplican).
- Para ficheros grandes (vídeo) se recomienda **URL firmada** (subida directa al almacén) + `complete`.

```http
POST /events/{id}/media
Authorization: Bearer <device-jwt>
Content-Type: multipart/form-data

id=<uuid-local>&session_id=<uuid>&kind=layout&file=<binary>
→ 200 { "id": "...", "public_url": "https://.../g/AB12/CD34/layout.jpg" }
```

## Galería pública

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/g/:eventCode/:sessionCode` | público (por código) | Galería de una sesión (HTML o JSON para la web) |
| GET | `/g/:eventCode` | público (por código) | Galería del evento (si se habilita) |
| GET | `/media/:id/download` | público (por código) | Descargar un medio |

- Acceso por **código no adivinable**, no listable, opción de **caducidad** (`gallery_expires_at`). Ver [privacidad](../01-arquitectura/seguridad-y-privacidad.md).

## Email

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/media/:id/email` | device | Enviar el medio por email a la dirección indicada (Resend) |

```json
POST /media/{id}/email
{ "to": "invitado@correo.com" }
→ 202 { "status": "queued" }
```

## Borrado (RGPD)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| DELETE | `/media/:id` | admin | Borrar un medio (derecho de supresión) |
| DELETE | `/events/:id/media` | admin | Borrar todos los medios de un evento |

## Convenciones

- Errores: JSON `{ "error": { "code", "message" } }` + códigos HTTP estándar.
- Versionado: prefijo `/v1` si se prevé evolución.
- Validación de esquema en cada endpoint (Fastify schema / zod).
