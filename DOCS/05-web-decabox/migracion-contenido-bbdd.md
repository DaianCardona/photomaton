# Migración de contenido estático a BBDD

Cubre RF-080/081. Hoy el contenido de los tipos de evento de la web vive **hardcodeado** en
`PROYECTOS\DECABOX\lib\translations.ts` (objeto `translations` con `es`, `fr`, `eu`). El objetivo es
servir ese contenido desde la **API + PostgreSQL** para poder editarlo sin tocar código.

## Estado actual (confirmado en el repo)

- `lib/translations.ts` (~1000 líneas): un objeto `translations = { es: {...}, fr: {...}, eu: {...} }`.
- Cada idioma contiene claves por tipo de evento: `weddings`, `baptisms`, `communions`, `corporate`, `parties`.
- Cada tipo tiene: `title`, `subtitle`, `description1/2`, `features` (objeto con `premium/designs/props/printing`, cada uno `title`+`description`), `benefits` (array de strings), `ctaTitle/ctaDescription/ctaButton`, `imageAlts`.
- Las páginas `app/{bodas,comuniones,empresas,fiestas}/page.tsx` hacen `const t = translations[language]` y renderizan `t.weddings.title`, etc. Son `'use client'`.

## Modelo destino (BBDD)

Tablas en `decabox-bbdd` (ver [esquema](../04-backend-api/esquema-bbdd.md)):
`event_types`, `event_type_translations`, `event_type_blocks` (kind = `feature` | `benefit`).

Mapeo:

| `translations.ts` | BBDD |
|-------------------|------|
| clave de tipo (`weddings`, …) | `event_types.slug` (`bodas`, `comuniones`, `empresas`, `fiestas`, `bautizos`) |
| `title/subtitle/description1/2/cta*` | `event_type_translations` (una fila por idioma) |
| `features.*` (premium/designs/props/printing) | `event_type_blocks` kind=`feature` (con `sort_order`) |
| `benefits[]` | `event_type_blocks` kind=`benefit` (con `sort_order`) |
| `imageAlts` | columnas/JSON en la traducción (o tabla aparte si crece) |

> Nota de nomenclatura: el código usa inglés (`weddings`) y las rutas español (`/bodas`). En BBDD se usa el **slug español** que ya emplean las rutas y se mapea al render.

## Estrategia de migración

1. **Script de extracción**: leer `translations.ts`, recorrer `es/fr/eu` × tipos, y generar los `INSERT`/seed para `event_types`, `event_type_translations`, `event_type_blocks`.
2. **Cargar** en `decabox-bbdd` (seed inicial).
3. **Exponer** en la API: `GET /event-types/:slug?lang=`.
4. **Adaptar la web** para consumir la API (ver [cambios frontend](cambios-frontend.md)).
5. **Validar** que las 4–5 páginas renderizan igual en es/fr/eu (comparación visual y de textos).
6. **Retirar** progresivamente `translations.ts` para el contenido migrado (puede quedar para textos de UI no migrados, como menús).

## Alcance

- Migrar **el contenido de los tipos de evento** (lo que pidió el usuario: que bodas/bautizos/etc. vengan de BBDD).
- Los textos de interfaz generales (menús, botones) pueden permanecer en `translations.ts` en esta fase (no es contenido editable de negocio). Decisión a confirmar según necesidad.

## Riesgos

- Mantener **paridad de idiomas** (es/fr/eu) — la migración debe cubrir los tres (RF-081).
- La web es hoy **static export**; servir contenido dinámico implica una decisión de renderizado (ver [cambios frontend](cambios-frontend.md)).
