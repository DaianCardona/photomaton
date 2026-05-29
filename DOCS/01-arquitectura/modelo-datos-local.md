# Modelo de datos local (SQLite + ficheros)

La app guarda **metadatos en SQLite** y **binarios en el sistema de ficheros** (carpeta del evento).
SQLite apunta a los ficheros por ruta relativa al evento. Esto cumple offline-first (RNF-005/006).

## Esquema SQLite (orientativo)

```sql
-- Configuración global de la app (clave/valor)
CREATE TABLE app_settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Eventos
CREATE TABLE events (
  id            TEXT PRIMARY KEY,         -- uuid
  name          TEXT NOT NULL,
  event_date    TEXT NOT NULL,            -- ISO date
  type          TEXT,                     -- boda | bautizo | comunion | empresa | fiesta
  folder_path   TEXT NOT NULL,            -- ruta absoluta de la carpeta del evento
  remote_id     TEXT,                     -- id del evento en la API (si sincronizado)
  settings_json TEXT,                     -- copias, filtro, fondo, corte, atrezzo…
  created_at    TEXT NOT NULL,
  archived_at   TEXT
);

-- Plantillas usadas en un evento
CREATE TABLE templates (
  id          TEXT PRIMARY KEY,
  event_id    TEXT REFERENCES events(id),
  name        TEXT NOT NULL,
  size        TEXT NOT NULL,              -- '10x15' | '5x15'
  orientation TEXT NOT NULL,              -- 'H' | 'V'
  photo_count INTEGER NOT NULL,           -- 1..4
  spec_json   TEXT NOT NULL,              -- huecos, capas de texto/imagen
  file_path   TEXT                        -- png de la plantilla
);

-- Sesiones (una interacción de invitados)
CREATE TABLE sessions (
  id          TEXT PRIMARY KEY,
  event_id    TEXT REFERENCES events(id),
  template_id TEXT REFERENCES templates(id),
  filter      TEXT,                       -- normal|bn|sepia|…
  background  TEXT,                       -- id de fondo virtual o null
  layout_path TEXT,                       -- jpg del montaje final
  gif_path    TEXT,                       -- gif si N>=2
  copies      INTEGER DEFAULT 1,
  created_at  TEXT NOT NULL
);

-- Fotos individuales de una sesión
CREATE TABLE photos (
  id            TEXT PRIMARY KEY,
  session_id    TEXT REFERENCES sessions(id),
  slot_index    INTEGER NOT NULL,         -- posición en la plantilla
  original_path TEXT NOT NULL,            -- original sin procesar
  single_path   TEXT,                     -- procesada (filtro/fondo)
  created_at    TEXT NOT NULL
);

-- Confesiones (vídeo)
CREATE TABLE confessions (
  id         TEXT PRIMARY KEY,
  event_id   TEXT REFERENCES events(id),
  video_path TEXT NOT NULL,
  duration_s INTEGER,
  created_at TEXT NOT NULL
);

-- Trabajos de impresión (auditoría y reimpresión)
CREATE TABLE print_jobs (
  id         TEXT PRIMARY KEY,
  session_id TEXT REFERENCES sessions(id),
  copies     INTEGER NOT NULL,
  cut        TEXT NOT NULL,               -- '10x15' | '5x15'
  status     TEXT NOT NULL,               -- queued|printing|done|error
  created_at TEXT NOT NULL
);

-- Cola de sincronización (subidas y emails pendientes)
CREATE TABLE sync_queue (
  id          TEXT PRIMARY KEY,
  kind        TEXT NOT NULL,              -- photo|gif|video|email
  ref_id      TEXT NOT NULL,              -- id del elemento relacionado
  payload_json TEXT,                      -- p.ej. email destino
  status      TEXT NOT NULL,              -- pending|uploading|done|error
  attempts    INTEGER DEFAULT 0,
  last_error  TEXT,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
```

## Relaciones

```
events 1───* templates
events 1───* sessions ───* photos
events 1───* confessions
sessions 1───* print_jobs
(sync_queue referencia photos/sessions/confessions por ref_id)
```

## Ficheros en disco

Los binarios viven en la carpeta del evento (ver [estructura de carpetas](../02-app-escritorio/estructura-carpetas-evento.md)).
SQLite guarda rutas; el binario es la fuente del medio, la fila es el metadato. Regla de oro:
**el original se escribe en `originales/` antes de insertar/actualizar nada más** (RNF-006).

## Ubicación de la BBDD

- Una BBDD SQLite **global** de la app (eventos, ajustes, cola) en el directorio de datos de usuario (`app.getPath('userData')`).
- Alternativa considerada: una SQLite **por evento** dentro de su carpeta (más portable, peor para consultas globales). Se opta por BBDD global + carpetas por evento.

## Sincronización con la API

`remote_id` en `events` y campos análogos enlazan filas locales con sus equivalentes en PostgreSQL
una vez subidas. La cola (`sync_queue`) es la que dispara las llamadas a la
[API](../04-backend-api/endpoints-api.md). Ver [flujo de sync](flujo-offline-online-sync.md).
