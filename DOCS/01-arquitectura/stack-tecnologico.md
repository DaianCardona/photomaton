# Stack tecnológico

Las versiones son orientativas (se fijarán en `package.json` al iniciar la implementación). Se prioriza
coherencia con la web DecaBox (React 18 + TypeScript + Tailwind).

## App de escritorio (Electron)

| Área | Tecnología | Notas |
|------|-----------|-------|
| Runtime | **Electron** (última LTS estable) | Empaqueta Chromium + Node |
| Lenguaje | **TypeScript** | Compartido main/renderer/shared |
| UI | **React 18** + **Vite** | Igual que la web; HMR rápido |
| Estilos | **Tailwind CSS** + shadcn/ui | Reutiliza componentes/estilo de la web |
| Estado UI | Zustand o Context | Ligero; estado de sesión/ajustes |
| Editor canvas | **Konva** (react-konva) o Fabric.js | Capas, texto, imágenes, huecos de foto |
| Proceso imagen | **sharp** (libvips) | Filtros, recorte, composición rápida |
| Chroma key / IA | OpenCV (chroma) · MediaPipe/`@imgly/background-removal` (IA) | Ver [fondos](../02-app-escritorio/fondos-virtuales.md) |
| GIF / vídeo | **ffmpeg** (ffmpeg-static / fluent-ffmpeg) | GIF y clips de confesión |
| Cámara | **Canon EDSDK** vía addon nativo (node-gyp/N-API) · *fallback* **gphoto2** | Ver [cámara](../03-hardware/camara-canon.md) |
| Impresora | API de impresión Windows + driver DNP · SDK DNP si disponible | Corte 5x15/10x15 |
| Audio | WebAudio/`getUserMedia` en renderer + ffmpeg en main | Confesiones |
| BBDD local | **SQLite** (better-sqlite3) | Metadatos y cola de sync |
| HTTP cliente | fetch nativo / undici | Subida a la API |
| Empaquetado | **electron-builder** | Instalador NSIS (.exe) / MSI; auto-update opcional |
| Tests | Vitest (unidad) + Playwright (E2E Electron) | |
| Logs | electron-log | Logs por evento y de errores |

## Backend / API

| Área | Tecnología | Notas |
|------|-----------|-------|
| Runtime | Node.js 18+ | Igual que la web |
| Framework | **Fastify** (o Express) | REST; Fastify por rendimiento/validación |
| ORM/Query | Prisma o Drizzle | Migraciones versionadas |
| BBDD | **PostgreSQL** (`decabox-bbdd`) | One-click app en CapRover |
| Almacén medios | Volumen CapRover o S3-compatible (MinIO) | Ver [almacenamiento](../04-backend-api/almacenamiento-medios.md) |
| Email | **Resend** | Ya instalado en la web |
| Auth | JWT | Dispositivo fotomatón + admin |
| QR | librería `qrcode` | Generación de QR de compartición |
| Despliegue | CapRover (Docker) | Ver [despliegue](../04-backend-api/despliegue-caprover.md) |

## Web DecaBox (existente)

| Área | Tecnología | Estado |
|------|-----------|--------|
| Framework | Next.js 13 (App Router) | `output: 'export'` (static) hoy |
| UI | React + shadcn/ui + Tailwind | 50+ componentes en `components/ui/` |
| i18n | objeto `translations` (es/fr/eu) en `lib/translations.ts` | A migrar a BBDD |
| Email | Resend + @react-email/render | Instalado |
| Supabase SDK | `@supabase/supabase-js` | Instalado, sin usar → se sustituye por API propia |
| Deploy | CapRover (`captain.cp.c2developers.com`) + Dockerfile (Next→nginx) | |

## Justificación de elecciones

- **Electron** frente a .NET/Tauri: máximo reaprovechamiento del stack web del usuario, editor de imagen y filtros más sencillos, ecosistema maduro para imagen/vídeo. El coste es el acceso a hardware Canon/DNP, que se resuelve con addons/SDK en el proceso main.
- **sharp + ffmpeg**: rendimiento nativo para filtros, montaje y GIF, claves para cumplir RNF-001/003.
- **SQLite local**: cero dependencia de red para el estado del evento (RNF-005/006).
- **PostgreSQL + API propia** en CapRover: todo bajo el control del usuario (c2developers.com), sin depender de un SaaS externo, y reaprovechando su infra de despliegue.
