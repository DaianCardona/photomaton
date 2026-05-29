# Arquitectura general

La app de escritorio es una aplicación **Electron** con separación clara entre el proceso *main*
(Node, acceso a hardware y ficheros) y el *renderer* (React, interfaz táctil). La comunicación entre
ambos se hace por **IPC** tipado. El backend (API + BBDD) es un servicio aparte en CapRover.

## Diagrama de alto nivel

```
┌──────────────────────────────────────────────────────────────┐
│                     APP ESCRITORIO (Electron)                  │
│                                                                │
│  ┌───────────────────────┐        IPC        ┌──────────────┐ │
│  │   RENDERER (React/TS)  │  <───────────────> │  MAIN (Node) │ │
│  │                        │   canal tipado     │              │ │
│  │  · Onboarding/evento   │                    │  · Cámara    │ │
│  │  · Editor plantillas   │                    │    (EDSDK/   │ │
│  │  · Captura + countdown │                    │     gphoto2) │ │
│  │  · Filtros/atrezzo     │                    │  · Impresora │ │
│  │  · Galería/reimpresión │                    │    (DNP)     │ │
│  │  · Confesiones         │                    │  · Audio/mic │ │
│  │  · Ajustes             │                    │  · FS evento │ │
│  └───────────────────────┘                    │  · SQLite    │ │
│            │                                   │  · Sync queue│ │
│            │                                   └──────┬───────┘ │
└────────────┼──────────────────────────────────────────┼────────┘
             │ (UI)                                       │ HTTPS (si hay red)
             ▼                                            ▼
        Pantalla táctil                        ┌─────────────────────┐
                                               │   CapRover           │
                                               │  · API Node (REST)   │
                                               │  · PostgreSQL        │
                                               │    (decabox-bbdd)    │
                                               │  · Almacén de medios │
                                               │  · Web DecaBox (Next)│
                                               └─────────────────────┘
```

## Procesos y responsabilidades

### Proceso main (Node)
- **Hardware**: control de cámara (live view, disparo, descarga), impresión DNP (copias, corte), captura de audio/micrófono.
- **Sistema de ficheros**: creación de carpetas por evento, guardado de originales/singles/layout/gifs/vídeos.
- **Persistencia**: base de datos local **SQLite** (eventos, sesiones, fotos, cola de sync, ajustes).
- **Procesado de imagen/vídeo** pesado: filtros, chroma key, montaje, GIF (sharp/ffmpeg/canvas en Node).
- **Sincronización**: cliente HTTP hacia la API, gestión de la cola offline.

### Proceso renderer (React)
- **UI** completa: modo operador y modo invitado.
- **Editor de plantillas** con canvas (Konva/Fabric).
- **Pantalla de captura**: muestra el live view (frames enviados desde main), cuenta atrás, previews.
- Llama a las capacidades del main por IPC; no accede a hardware directamente.

### Backend (CapRover)
- **API REST** (Fastify/Express): eventos, subida de medios, galería, email.
- **PostgreSQL** `decabox-bbdd`: contenido de la web + eventos + fotos.
- **Almacén de medios**: volumen CapRover o S3-compatible.
- **Web DecaBox** (Next.js): consume la API; galería pública.

## Capas (dentro de la app)

```
renderer/ (UI)
   └── llama por IPC →
main/ (servicios)
   ├── camera/        control cámara
   ├── printer/       control DNP
   ├── audio/         micrófono
   ├── media/         filtros, montaje, gif, chroma
   ├── storage/       FS por evento + SQLite (repos)
   ├── sync/          cola y cliente API
   └── ipc/           handlers tipados
shared/ (tipos y contratos comunes a main y renderer)
```

## Decisiones clave

- **IPC tipado** con contratos en `shared/` para que renderer y main no se desincronicen.
- **`contextIsolation: true`** y `nodeIntegration: false`; el renderer solo accede a un `preload` con API mínima.
- **Procesado pesado en main** (o en *worker*) para no bloquear la UI.
- **Offline-first**: la UI nunca espera a la red; la subida es asíncrona vía cola. Ver [sync](flujo-offline-online-sync.md).
- **Una sola fuente de verdad local**: SQLite para metadatos + FS para binarios. Ver [modelo de datos](modelo-datos-local.md).

## Flujo de una sesión (resumen técnico)

1. Renderer pide "iniciar sesión" → main arranca live view (stream de frames por IPC).
2. Renderer muestra cuenta atrás → pide "disparar" → main captura y guarda **original**.
3. main aplica filtro/fondo → genera **single** → repite por cada foto.
4. main monta el **layout** sobre la plantilla → genera **GIF** si N≥2.
5. main imprime (copias + corte) y encola medios para sync.
6. Renderer muestra resultado + QR/email.

Ver detalle en [flujo de captura](../02-app-escritorio/flujo-captura.md).
