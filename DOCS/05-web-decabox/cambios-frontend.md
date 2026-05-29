# Cambios en el frontend de la web DecaBox

La web actual (`PROYECTOS\DECABOX`, Next.js 13) usa `output: 'export'` (static export) y todas las
páginas son `'use client'`. Para servir eventos desde BBDD y mostrar galerías dinámicas hay que ajustar
la estrategia de renderizado, minimizando el impacto en lo que ya funciona.

## Situación actual (confirmada)

- `next.config.js`: `output: 'export'`, `images.unoptimized: true` → sitio 100% estático en `out/`.
- Despliegue: `Dockerfile` (build Next → nginx sirve `out/`). Deploy con `main-deploy.sh` + CapRover.
- Contenido de tipos de evento en `lib/translations.ts` (es/fr/eu).

## Qué cambia y cómo

### 1. Páginas comerciales (bodas, comuniones, empresas, fiestas)
- Pasan a leer su contenido desde la **API** en lugar de `translations.ts`.
- Como el contenido cambia poco, encaja **SSG con datos de la API en build** + **revalidación** (ISR) o **rebuild on publish**:
  - **Opción A (recomendada):** quitar `output: 'export'` y desplegar Next en modo servidor (Node) en CapRover, usando `fetch` con `revalidate` (ISR). Permite editar contenido en BBDD y que la web se actualice sin redeploy.
  - **Opción B (mínimo cambio):** mantener static export, pero el build hace `fetch` a la API para generar el contenido. Editar contenido requiere **rebuild/redeploy**.

### 2. Galería pública de eventos
- Es **dinámica** (cambia durante el evento). Requiere render dinámico:
  - Servida por la **API** (`/g/...`) y enlazada desde la web, **o**
  - Ruta dinámica Next (`app/g/[eventCode]/[sessionCode]`) con render en servidor.
- Esto empuja hacia la **Opción A** (Next en modo servidor) para no complicar la galería.

### 3. Configuración
- Nueva variable `NEXT_PUBLIC_API_URL` (o `API_URL` en server) apuntando a `decabox-api`.
- Cliente de datos en `lib/` (sustituye el import directo de `translations.ts` por llamadas a la API). El SDK de Supabase instalado **se retira** (no se usa).

### 4. Despliegue
- Si se adopta la Opción A: cambiar el `Dockerfile`/`captain-definition` para correr `next start` (Node) en vez de servir `out/` con nginx. Ver [despliegue](../04-backend-api/despliegue-caprover.md).

## Impacto y compatibilidad

| Área | Impacto |
|------|---------|
| SEO | Mantener metadatos (`lib/seo-metadata.ts`) y schemas; ISR conserva SEO |
| i18n | Conservar es/fr/eu; el `LanguageSwitcher` sigue, pero los textos vienen de la API |
| Componentes | Sin cambios en `components/ui/`; cambia el origen de datos, no el render |
| Static export | Se abandona si se elige Opción A (decisión a confirmar) |

## Decisión (CONFIRMADA)

**Opción A — Next en modo servidor con ISR en CapRover.** Decidido por el usuario (2026-05-29).
Motivos: desbloquea la galería dinámica de fotos por evento y permite editar el contenido (bodas,
comuniones…) desde la BBDD **sin volver a desplegar**, con bajo coste de migración.

Implicaciones a ejecutar en la Fase 5:
- Quitar `output: 'export'` de `next.config.js`.
- Servir con `next start` (Node) en CapRover en vez de nginx sirviendo `out/`.
- Ajustar `Dockerfile` y `captain-definition` al nuevo modo de arranque.
- Usar `fetch` con `revalidate` (ISR) en las páginas de tipos de evento.
- Galería por evento como ruta dinámica Next que consume la API.
- Conservar metadatos SEO (`lib/seo-metadata.ts`) y schemas (ISR preserva el SEO).
