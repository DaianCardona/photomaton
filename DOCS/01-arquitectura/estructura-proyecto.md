# Estructura del proyecto (repo de la app)

Propuesta de organización del repositorio Electron, en `PROYECTOS\PHOTOMATON` (junto a `DOCS/`).

```
PHOTOMATON/
├── DOCS/                       ← esta documentación
├── package.json
├── electron-builder.yml        ← config del instalador (.exe/MSI)
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── src/
│   ├── main/                   ← proceso principal (Node)
│   │   ├── index.ts            ← arranque, ventana, ciclo de vida
│   │   ├── ipc/                ← handlers IPC tipados
│   │   ├── camera/             ← EDSDK/gphoto2: liveview, disparo, descarga
│   │   ├── printer/            ← DNP: impresión, copias, corte, estado
│   │   ├── audio/              ← captura de micrófono (confesiones)
│   │   ├── media/              ← filtros, chroma/IA, montaje, gif (sharp/ffmpeg)
│   │   ├── storage/
│   │   │   ├── db/             ← SQLite (better-sqlite3), repos, migraciones
│   │   │   └── fs/             ← carpetas por evento, escritura de medios
│   │   └── sync/               ← cola offline + cliente API
│   ├── preload/
│   │   └── index.ts            ← API segura expuesta al renderer
│   ├── renderer/               ← UI React
│   │   ├── main.tsx
│   │   ├── app/                ← rutas/pantallas
│   │   │   ├── operador/       ← onboarding evento, ajustes, galería
│   │   │   ├── editor/         ← editor de plantillas (canvas)
│   │   │   ├── captura/        ← liveview, countdown, previews, montaje
│   │   │   ├── confesiones/    ← grabación de vídeo
│   │   │   └── invitado/       ← flujo táctil del invitado
│   │   ├── components/         ← UI compartida (reutiliza estilo web)
│   │   ├── hooks/
│   │   └── store/              ← estado (zustand)
│   └── shared/                 ← tipos y contratos comunes main↔renderer
│       ├── ipc-contract.ts     ← nombres de canal + tipos de payload
│       ├── models.ts           ← Event, Session, Photo, Template, …
│       └── settings.ts
├── resources/                  ← binarios (ffmpeg, edsdk dll), iconos
├── assets/                     ← fondos, atrezzo, plantillas de ejemplo
└── tests/
```

## Convenciones

- **`shared/`** es la única fuente de los tipos que cruzan IPC; main y renderer importan de aquí.
- Cada servicio del main (`camera`, `printer`, …) expone una interfaz; los handlers IPC son finos y delegan.
- El renderer **nunca** importa módulos de Node ni accede a `fs`/hardware: todo pasa por `preload` + IPC.
- Las pantallas del invitado y del operador comparten componentes pero tienen *layouts* distintos (modo invitado bloqueado).
- Binarios nativos (EDSDK DLL, ffmpeg) viven en `resources/` y se referencian por ruta resuelta en runtime (dev vs empaquetado).

## Relación con la web DecaBox

La web sigue en su repo (`PROYECTOS\DECABOX`). El contrato entre app y web es la **API REST**
(ver [endpoints](../04-backend-api/endpoints-api.md)). No comparten código directamente, pero sí
**estilo/branding** (Tailwind + shadcn) para coherencia visual.
