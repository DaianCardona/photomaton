# DecaBox Photomaton

Aplicación de escritorio del fotomatón DecaBox: **Electron + React 18 + TypeScript + Vite**,
con estilo **Tailwind CSS / shadcn-ui** alineado con la web DecaBox.

> Plataforma objetivo: **Windows x64** (Surface). Validar en Windows desde el inicio.

## Requisitos

- **Node.js 18+** (probado con Node 20/22/24) y npm.
- Windows 10/11 (objetivo de empaquetado).

## Puesta en marcha

```bash
npm install        # instala dependencias (descarga el binario de Electron)
npm run dev        # abre la ventana con HMR (React + Vite)
```

`npm run dev` levanta el servidor de Vite para el *renderer* y arranca Electron
cargándolo; los cambios en `src/renderer` se reflejan al instante (HMR). Los cambios
en `src/main` o `src/preload` reinician el proceso correspondiente.

## Scripts

| Script | Qué hace |
|--------|----------|
| `npm run dev` | Arranca la app en desarrollo con HMR. |
| `npm run build` | Type-check + compila main/preload/renderer a `out/`. |
| `npm run build:win` | `build` + genera instalador NSIS (`.exe`) en `release/`. |
| `npm run build:unpack` | `build` + app descomprimida (sin instalador) para pruebas. |
| `npm run typecheck` | Comprobación de tipos (node + web) sin emitir. |
| `npm run lint` / `lint:fix` | ESLint sobre todo el proyecto. |
| `npm run format` / `format:check` | Prettier. |
| `npm run test` / `test:watch` | Tests con Vitest. |

## Estructura

```
src/
├── main/      ← proceso principal (Node): ventana, ciclo de vida, IPC, hardware
├── preload/   ← puente seguro expuesto en window.api (contextBridge)
├── renderer/  ← UI React (Tailwind + shadcn)
└── shared/    ← tipos y contratos comunes main ↔ renderer
```

Detalle completo en [`DOCS/01-arquitectura/estructura-proyecto.md`](DOCS/01-arquitectura/estructura-proyecto.md).

### Alias de importación

- `@main/*`    → `src/main/*`
- `@renderer/*`→ `src/renderer/*`
- `@shared/*`  → `src/shared/*`

## Seguridad del renderer

El *renderer* corre con `contextIsolation: true` y `nodeIntegration: false`: **no**
tiene acceso a `require`, `fs` ni a APIs de Node. Toda comunicación con el sistema
pasa por el `preload` (`window.api`) e IPC tipado (ver `src/shared/ipc-contract.ts`).
