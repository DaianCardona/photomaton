# Fases y MVP

El usuario quiere que el MVP cubra **todo** el flujo. Para gestionar riesgo y poder usar la app en un
evento real cuanto antes, se ordena el trabajo en fases incrementales: cada fase deja algo **usable**.

## Fase 0 — Cimientos (sin lo que ya hay)
- Andamiaje del proyecto Electron (main/renderer/shared), build con Vite, electron-builder.
- SQLite local + creación de carpetas por evento (RF-001).
- Pantalla de ajustes básica + modo operador/invitado.
- Selección de cámara e impresora (detección).

**Entregable:** app que arranca, crea eventos y detecta hardware.

## Fase 1 — Núcleo del fotomatón (MVP mínimo usable en evento)
- Integración cámara Canon: live view + disparo + guardado de original (RF-020/022/025).
- Cuenta atrás y flujo de 1–4 fotos (RF-021/023).
- Editor de plantillas básico + importar PNG + montaje del layout (RF-010..016, RF-024).
- Impresión DNP con copias y corte 5x15/10x15 (RF-030/031/033).
- Reimpresión desde galería local (RF-032/034).
- Filtros básicos (normal, B/N, sepia/beige) (RF-040).

**Entregable:** **primer evento real** operado solo con la app (fotos + plantilla + impresión).

## Fase 2 — Online y compartir
- API + `decabox-bbdd` desplegadas en CapRover ([despliegue](../04-backend-api/despliegue-caprover.md)).
- Ingesta de medios + cola de sync offline-first (RF-060/061/083).
- QR + galería pública (RF-062, RF-082).
- Email vía Resend (RF-063).
- GIF automático con 2+ fotos (RF-050/051).

**Entregable:** fotos suben a la web; invitados comparten por QR y reciben por email.

## Fase 3 — Personalización avanzada
- Atrezzo virtual (RF-041).
- Fondos virtuales por **croma** (RF-042/043).
- Filtros adicionales e intensidad.

**Entregable:** experiencia "filtros y fondos" para los invitados.

## Fase 4 — Vídeo y fondo por IA
- Vídeo-confesiones con micrófono (RF-052/053).
- Fondo virtual por **IA** sin croma (RF-044), tras medir rendimiento.

**Entregable:** confesiones y fondo sin croma.

## Fase 5 — Web DecaBox dinámica
- Migración de `translations.ts` a BBDD (RF-080/081).
- Web consumiendo la API en **Next modo servidor + ISR** (decisión confirmada; ver [cambios frontend](../05-web-decabox/cambios-frontend.md)): quitar `output: 'export'`, pasar a `next start` en CapRover, ISR en páginas de evento, galería dinámica.

**Entregable:** contenido de la web editable desde BBDD.

## Resumen de prioridades

| Fase | Foco | ¿Imprescindible 1er evento? |
|------|------|------------------------------|
| 0 | Cimientos | Sí |
| 1 | Captura + plantilla + impresión | **Sí (MVP)** |
| 2 | Online + compartir + GIF | Deseable |
| 3 | Atrezzo + croma | No |
| 4 | Vídeo + IA | No |
| 5 | Web dinámica | Independiente |

> Las fases 2–5 pueden solaparse según disponibilidad. La 1 es el corazón y debe estar sólida antes de
> añadir capas. Ver [backlog](backlog.md) y [riesgos](riesgos.md).
