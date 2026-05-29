# Backlog

Lista de tareas priorizada, agrupada por fase (ver [fases y MVP](fases-y-mvp.md)). Marcar al avanzar.

## Fase 0 — Cimientos
- [ ] Inicializar proyecto Electron + Vite + TS + Tailwind (estructura de [estructura-proyecto](../01-arquitectura/estructura-proyecto.md)).
- [ ] Configurar electron-builder (instalador .exe/MSI).
- [ ] Contrato IPC tipado en `shared/`.
- [ ] SQLite (better-sqlite3) + migraciones + repos.
- [ ] Crear evento + carpetas estándar (RF-001).
- [ ] Pantalla de ajustes base + PIN operador.
- [ ] Detección de cámara e impresora.

## Fase 1 — Núcleo fotomatón (MVP)
- [ ] Driver cámara Canon (EDSDK addon): list/open/liveView/capture (RF-020/022/025).
- [ ] Fallback webcam para contingencia.
- [ ] Pantalla de captura: live view + cuenta atrás + previews (RF-021/023).
- [ ] Editor de plantillas: lienzo 10x15/5x15, importar PNG, huecos, texto, imagen (RF-010..015).
- [ ] Motor de montaje (sharp) a 300 DPI (RF-024).
- [ ] Filtros básicos: normal/BN/sepia/beige (RF-040).
- [ ] Driver impresora DNP: print(copies, cut), estado (RF-030/031/033/035).
- [ ] Galería local + reimpresión (RF-032/034).

## Fase 2 — Online y compartir
- [ ] Crear `decabox-bbdd` (PostgreSQL) en CapRover.
- [ ] Servicio `decabox-api` (Fastify) + migraciones + `/health`.
- [ ] Auth de dispositivo (JWT) + aprovisionamiento de token.
- [ ] Adaptador de almacenamiento (volumen → MinIO).
- [ ] Ingesta de medios (upsert idempotente) (RF-083).
- [ ] Cola de sync offline-first en la app (RF-060/061).
- [ ] Generación de GIF (ffmpeg) (RF-050/051).
- [ ] Galería pública por código (RF-082).
- [ ] QR en la app (RF-062).
- [ ] Email vía Resend desde la API (RF-063).

## Fase 3 — Personalización avanzada
- [ ] Atrezzo virtual manual (overlays) (RF-041).
- [ ] Catálogo de atrezzo + gestión por evento.
- [ ] Fondo virtual por croma (OpenCV/canvas) (RF-042/043).
- [ ] Colección de fondos + selección por invitado.
- [ ] Filtros adicionales + intensidad.

## Fase 4 — Vídeo y fondo IA
- [ ] Captura de micrófono + niveles (RF hardware audio).
- [ ] Módulo confesiones: grabar/revisar/guardar (RF-052/053).
- [ ] Sync A/V con ffmpeg.
- [ ] Fondo por IA (MediaPipe / imgly) tras medir rendimiento (RF-044).

## Fase 5 — Web dinámica
- [ ] Script de extracción `translations.ts` → seed BBDD (es/fr/eu).
- [ ] Endpoints `event-types` en la API.
- [ ] Adaptar páginas `bodas/comuniones/empresas/fiestas` a la API (RF-080/081).
- [ ] Decisión static export vs Next servidor + ajuste de deploy.
- [ ] Retirar SDK Supabase no usado.

## Transversal
- [ ] Logs por evento (electron-log).
- [ ] Aviso de espacio en disco.
- [ ] Evitar suspensión durante evento activo (RNF-019).
- [ ] Textos de consentimiento RGPD en pantalla.
- [ ] Pruebas E2E del flujo de captura (Playwright).
- [ ] Guía de uso en evento + troubleshooting (carpeta 08).
