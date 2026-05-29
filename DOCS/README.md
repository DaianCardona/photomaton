# DecaBox Fotomatón — Documentación del proyecto

Documentación técnica y funcional de la **app de escritorio DecaBox Fotomatón** (Windows/Surface)
y de su **integración** con la web comercial DecaBox (Next.js) mediante una **API + BBDD PostgreSQL**
en CapRover.

> Estado: **documentación de arranque** (iteración 1). Aún no hay código de la app de escritorio.
> El objetivo de esta carpeta es dejar fijado el qué, el cómo y el orden de implementación.

## Mapa de la documentación

### 00 · Visión y requisitos
- [Visión y objetivos](00-vision/vision-y-objetivos.md) — problema, objetivos, por qué app propia.
- [Glosario](00-vision/glosario.md) — terminología del proyecto.
- [Requisitos funcionales](00-vision/requisitos-funcionales.md) — lista RF-### trazable.
- [Requisitos no funcionales](00-vision/requisitos-no-funcionales.md) — rendimiento, fiabilidad, RGPD.
- [Casos de uso](00-vision/casos-de-uso.md) — flujos de invitado y operador.

### 01 · Arquitectura
- [Arquitectura general](01-arquitectura/arquitectura-general.md) — Electron main/renderer/IPC.
- [Stack tecnológico](01-arquitectura/stack-tecnologico.md) — librerías y versiones.
- [Estructura del proyecto](01-arquitectura/estructura-proyecto.md) — layout del repo.
- [Modelo de datos local](01-arquitectura/modelo-datos-local.md) — SQLite + carpetas.
- [Flujo offline/online y sync](01-arquitectura/flujo-offline-online-sync.md) — cola de subida.
- [Seguridad y privacidad](01-arquitectura/seguridad-y-privacidad.md) — RGPD, consentimiento.

### 02 · App de escritorio
- [Flujo de captura](02-app-escritorio/flujo-captura.md)
- [Editor de plantillas](02-app-escritorio/editor-plantillas.md)
- [Filtros de imagen](02-app-escritorio/filtros-imagen.md)
- [Atrezzo virtual](02-app-escritorio/atrezzo-virtual.md)
- [Fondos virtuales (croma + IA)](02-app-escritorio/fondos-virtuales.md)
- [GIF y vídeo](02-app-escritorio/gif-y-video.md)
- [Vídeo-confesiones](02-app-escritorio/video-confesiones.md)
- [Pantalla de ajustes](02-app-escritorio/pantalla-ajustes.md)
- [Reimpresión y galería local](02-app-escritorio/reimpresion-y-galeria.md)
- [Estructura de carpetas por evento](02-app-escritorio/estructura-carpetas-evento.md)

### 03 · Hardware
- [Cámara Canon](03-hardware/camara-canon.md)
- [Impresora DNP](03-hardware/impresora-dnp.md)
- [Micrófono y audio](03-hardware/microfono-audio.md)
- [Requisitos de hardware](03-hardware/requisitos-hardware.md)

### 04 · Backend / API
- [Arquitectura de la API](04-backend-api/arquitectura-api.md)
- [Esquema de BBDD](04-backend-api/esquema-bbdd.md)
- [Endpoints de la API](04-backend-api/endpoints-api.md)
- [Almacenamiento de medios](04-backend-api/almacenamiento-medios.md)
- [Autenticación y roles](04-backend-api/autenticacion-y-roles.md)
- [Despliegue en CapRover](04-backend-api/despliegue-caprover.md)

### 05 · Web DecaBox
- [Migración de contenido estático a BBDD](05-web-decabox/migracion-contenido-bbdd.md)
- [Galería pública de eventos](05-web-decabox/galeria-publica-eventos.md)
- [Cambios en el frontend](05-web-decabox/cambios-frontend.md)

### 06 · Integraciones
- [Compartir por QR](06-integraciones/compartir-qr.md)
- [Email (Resend)](06-integraciones/email-resend.md)
- [Instagram: limitaciones y alternativa](06-integraciones/instagram-limitaciones.md)

### 07 · Roadmap
- [Fases y MVP](07-roadmap/fases-y-mvp.md)
- [Backlog](07-roadmap/backlog.md)
- [Riesgos](07-roadmap/riesgos.md)

### 08 · Operativa
- [Guía de uso en evento](08-operativa/guia-uso-evento.md)
- [Troubleshooting](08-operativa/troubleshooting.md)
- [Mantenimiento y backups](08-operativa/mantenimiento-y-backups.md)

### TASKS · Tareas de implementación
- [Fase 0 · Cimientos](TASKS/README.md) — andamiaje Electron, SQLite, eventos/carpetas, ajustes, detección de hardware.

## Resumen de decisiones técnicas

| Tema | Decisión |
|------|----------|
| App de escritorio | Electron + React + TypeScript |
| Cámara | Canon DSLR (EDSDK; fallback gphoto2), USB tethering + live view |
| Impresora | DNP (DS-RX1 / DS620 / QW410), corte 10x15 ↔ 2×(5x15) configurable |
| Persistencia local | SQLite + sistema de ficheros por evento |
| Backend | API Node (Fastify/Express) + PostgreSQL `decabox-bbdd` en CapRover |
| Compartir | QR + galería web + email (Resend). Instagram: solo documentado con límites |
| Fondo virtual | Croma verde (chroma key) **y** IA sin croma, elegible por evento |
| Conectividad | Offline-first con cola de sincronización |
| Web DecaBox | Next en **modo servidor + ISR** (deja de ser static export); contenido desde BBDD y galería dinámica |

## Convenciones

- Documentos en español, formato Markdown (GitHub-flavored).
- Identificadores de requisito: `RF-###` (funcional), `RNF-###` (no funcional).
- Rutas reales del entorno con `C:\Users\Daian\Desktop\PROYECTOS\...`.
- Las decisiones se centralizan aquí; los docs de detalle no deben contradecirlas.
