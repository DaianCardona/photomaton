# Tareas — Fase 0 · Cimientos

Tareas detalladas de la **Fase 0** del [roadmap](../07-roadmap/fases-y-mvp.md). Objetivo de la fase:
dejar una app Electron que **arranca, crea eventos (con sus carpetas), detecta el hardware y tiene
ajustes básicos con modo operador/invitado**. No incluye captura ni impresión reales (eso es Fase 1).

> La Fase 0 **no depende** del modelo de cámara (pendiente de confirmar): solo detecta/lista dispositivos.

## Lista de tareas

| ID | Tarea | Depende de | Estado |
|----|-------|-----------|--------|
| [F0-01](F0-01-scaffolding-electron.md) | Andamiaje del proyecto Electron (main/renderer/shared) | — | ☐ |
| [F0-02](F0-02-empaquetado-electron-builder.md) | Empaquetado e instalador (electron-builder) | F0-01 | ☐ |
| [F0-03](F0-03-contrato-ipc.md) | Contrato IPC tipado + preload seguro | F0-01 | ☐ |
| [F0-04](F0-04-sqlite-persistencia.md) | Persistencia local SQLite + migraciones + repos | F0-01 | ☐ |
| [F0-05](F0-05-evento-y-carpetas.md) | Crear/abrir evento + carpetas estándar (RF-001/002) | F0-03, F0-04 | ☐ |
| [F0-06](F0-06-ajustes-y-modo-operador.md) | Pantalla de ajustes base + modo operador/invitado (PIN) | F0-03, F0-04 | ☐ |
| [F0-07](F0-07-deteccion-hardware.md) | Detección de cámara e impresora (solo listado/estado) | F0-03 | ☐ |

## Orden sugerido

```
F0-01 ─┬─ F0-02
       ├─ F0-03 ─┬─ F0-05
       │         ├─ F0-06
       │         └─ F0-07
       └─ F0-04 ─┴─ (F0-05, F0-06)
```

## Definición de "Hecho" de la Fase 0 (Definition of Done)

- [ ] La app se instala con un `.exe` y arranca en < 10 s (RNF-004).
- [ ] Se puede **crear un evento** y se generan sus carpetas (`plantillas/originales/layout/gifs/videos/confesiones/greenscreen`).
- [ ] Los eventos se **listan y se reabren** (datos en SQLite).
- [ ] Existe **pantalla de ajustes** con guardado y **modo operador protegido por PIN**.
- [ ] La app **lista** cámaras e impresoras conectadas y muestra su estado básico.
- [ ] Comunicación renderer↔main solo por **IPC tipado** (sin acceso a Node desde el renderer).
- [ ] Lint + build + tests base en verde.

## Convenciones de las fichas
- Cada tarea tiene: objetivo, dependencias, subtareas (checkboxes), criterios de aceptación, referencias y notas.
- ID `F0-NN`. Al avanzar, marca el estado en esta tabla y los checkboxes de cada ficha.
- Referencias a la documentación de arquitectura en `../01-arquitectura/` y `../02-app-escritorio/`.
