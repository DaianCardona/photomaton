# Esquema de la BBDD (PostgreSQL)

BBDD `decabox-bbdd` en CapRover. Dos dominios: **contenido de la web** (tipos de evento multilingües)
y **datos del fotomatón** (eventos, medios, galerías). Esquema orientativo (se fijará con Prisma/Drizzle).

## Dominio 1 — Contenido web (migración de `translations.ts`)

```sql
-- Tipo de evento de la web: bodas, comuniones, empresas, fiestas, bautizos
CREATE TABLE event_types (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       TEXT UNIQUE NOT NULL,          -- 'bodas', 'comuniones', …
  sort_order INT DEFAULT 0,
  active     BOOLEAN DEFAULT TRUE
);

-- Traducciones del contenido por idioma (es, fr, eu)
CREATE TABLE event_type_translations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type_id UUID REFERENCES event_types(id) ON DELETE CASCADE,
  lang          TEXT NOT NULL,              -- 'es' | 'fr' | 'eu'
  title         TEXT,
  subtitle      TEXT,
  description1  TEXT,
  description2  TEXT,
  cta_title     TEXT,
  cta_text      TEXT,
  UNIQUE (event_type_id, lang)
);

-- Bloques repetibles (features, benefits) por tipo e idioma
CREATE TABLE event_type_blocks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type_id UUID REFERENCES event_types(id) ON DELETE CASCADE,
  lang          TEXT NOT NULL,
  kind          TEXT NOT NULL,              -- 'feature' | 'benefit'
  title         TEXT,
  body          TEXT,
  icon          TEXT,
  sort_order    INT DEFAULT 0
);
```

> Esto reproduce la forma actual de `lib/translations.ts` (objeto por idioma con `title/subtitle/
> description/features/benefits/cta…`), pero editable sin tocar código. Ver [migración](../05-web-decabox/migracion-contenido-bbdd.md).

## Dominio 2 — Fotomatón

```sql
-- Evento real (boda concreta) gestionado por el fotomatón
CREATE TABLE booth_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  event_date  DATE NOT NULL,
  type        TEXT,                         -- boda|bautizo|comunion|empresa|fiesta
  code        TEXT UNIQUE NOT NULL,         -- código no adivinable para galería/QR
  gallery_expires_at TIMESTAMPTZ,           -- caducidad opcional (RGPD)
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Sesión (interacción de invitados)
CREATE TABLE booth_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id   UUID REFERENCES booth_events(id) ON DELETE CASCADE,
  code       TEXT NOT NULL,                 -- código de sesión para URL/QR
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (event_id, code)
);

-- Medio subido (foto single, layout, gif, vídeo, confesión)
CREATE TABLE media (
  id          UUID PRIMARY KEY,             -- == uuid local (idempotencia)
  event_id    UUID REFERENCES booth_events(id) ON DELETE CASCADE,
  session_id  UUID REFERENCES booth_sessions(id) ON DELETE SET NULL,
  kind        TEXT NOT NULL,                -- single|layout|gif|video|confession
  storage_key TEXT NOT NULL,               -- ruta/clave en el almacén
  public_url  TEXT,                         -- URL servible
  width       INT, height INT, bytes BIGINT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Solicitudes de email (auditoría)
CREATE TABLE email_requests (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id   UUID REFERENCES media(id) ON DELETE CASCADE,
  to_email   TEXT NOT NULL,
  status     TEXT NOT NULL,                 -- pending|sent|error
  provider_id TEXT,                         -- id de Resend
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dispositivos fotomatón autorizados
CREATE TABLE devices (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT,
  token_hash TEXT NOT NULL,                 -- hash del token del dispositivo
  active     BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Relaciones

```
event_types 1───* event_type_translations
event_types 1───* event_type_blocks
booth_events 1───* booth_sessions 1───* media
media 1───* email_requests
```

## Índices clave

- `booth_events.code` (único) y `booth_sessions(event_id, code)` para resolver galerías por URL.
- `media.id` = uuid del cliente → **upsert idempotente** en reintentos de sync.
- `event_type_translations(event_type_id, lang)` para servir la web por idioma.

## Datos semilla

- `event_types`: `bodas`, `comuniones`, `empresas`, `fiestas` (+ `bautizos` si se añade), migrados desde `translations.ts` en los 3 idiomas. Ver [migración](../05-web-decabox/migracion-contenido-bbdd.md).
