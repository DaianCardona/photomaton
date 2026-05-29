# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DecaBox Photomaton — desktop photo-booth app for Windows x64 (Surface). **Electron + React 18 + TypeScript + Vite**, styled with Tailwind / shadcn-ui to match the DecaBox web. The app drives real hardware (Canon camera via EDSDK, DNP printer, microphone), works **offline-first**, and syncs media to a separate CapRover backend (REST API + PostgreSQL) when network is available. The backend lives in a separate repo; the only contract between them is the REST API.

The project is in **Fase 0** (scaffolding): the app boots and exposes typed IPC, but camera/printer/media/sync subsystems are mostly empty `.gitkeep` stubs. The roadmap and per-task specs live in `DOCS/` (see `DOCS/TASKS/README.md` for the current task list and Definition of Done). `DOCS/` is the source of truth for intended behavior — consult the relevant `DOCS/0X-*/*.md` before building a subsystem.

## Commands

```bash
npm install          # installs deps + downloads the Electron binary
npm run dev          # launches the app with HMR (Vite renderer + Electron)
npm run build        # typecheck + compile main/preload/renderer to out/
npm run build:win    # build + NSIS installer (.exe) in release/
npm run build:unpack # build + unpacked app (no installer) for testing
npm run typecheck    # tsc --noEmit for both node + web projects
npm run lint         # eslint . (use lint:fix to autofix)
npm run format       # prettier --write
npm run test         # vitest run (one-shot)
npm run test:watch   # vitest in watch mode
```

Run a single test file: `npx vitest run tests/example.test.ts`. Run by name: `npx vitest run -t "<test name>"`.

`build` runs `typecheck` first, so a type error fails the build. There is no combined "check everything" script — run `lint`, `typecheck`, and `test` separately before committing.

## Architecture

Electron's three-process split is the central organizing principle. Crossing process boundaries the wrong way is the most common mistake here.

- **`src/main/`** — Node process. The **only** place with access to hardware, the filesystem, SQLite, and heavy image/video processing. Subsystems: `camera/` (EDSDK liveview/shoot/download), `printer/` (DNP), `audio/` (mic), `media/` (filters, chroma, montage, GIF — sharp/ffmpeg), `storage/db/` (SQLite via better-sqlite3) + `storage/fs/` (per-event folders), `sync/` (offline queue + API client), `ipc/` (thin typed handlers that delegate to the subsystems). Entry point: `src/main/index.ts`.
- **`src/preload/`** — the security bridge. Exposes a minimal, typed API on `window.api` via `contextBridge`. This is the renderer's *only* channel to the main process.
- **`src/renderer/`** — React UI. Screens under `app/` (`operador/`, `editor/`, `captura/`, `confesiones/`, `invitado/`), shared `components/`, `hooks/`, and `store/` (zustand). **Never** imports Node modules or touches `fs`/hardware — everything goes through `window.api` + IPC.
- **`src/shared/`** — types shared across all three processes. `ipc-contract.ts` is the single source of channel names + payload types; `models.ts` holds domain types (Event, Session, Photo, Template).

### IPC contract — the rule to follow

`src/shared/ipc-contract.ts` is the single source of truth for IPC. To add a channel: define the name in `IpcChannels` and its payload types in that file, then register a handler in `main` (`ipcMain.handle`) and add the corresponding method to the `PhotomatonApi` surface in `preload`. Main, preload, and renderer all import from `@shared/ipc-contract`, so changing the contract surfaces type errors anywhere it's out of sync. Keep the `window.api` surface minimal and typed — do not expose raw `ipcRenderer`.

### Security model (do not weaken)

The renderer runs with `contextIsolation: true` and `nodeIntegration: false`. It has no `require`, `fs`, or Node APIs. All system access flows through the preload bridge. Keep it that way when adding features.

### Other conventions

- Each main subsystem exposes an interface; IPC handlers stay thin and delegate to it.
- Native binaries (EDSDK DLL, ffmpeg) live in `resources/` and are referenced by a path resolved at runtime (dev vs packaged differ). They are git-ignored (`resources/bin/`).
- Heavy processing runs in main (or a worker), never blocking the renderer. The UI never waits on the network — uploads go through the async sync queue.
- Local source of truth: SQLite for metadata + filesystem for binaries (per-event folders under git-ignored `/eventos/` and `/captures/`).

## Path aliases

`@main/*` → `src/main/*`, `@renderer/*` → `src/renderer/*`, `@shared/*` → `src/shared/*`. Aliases are defined in **three** places that must stay in sync: `electron.vite.config.ts`, `tsconfig.node.json` (main/preload/shared), and `tsconfig.web.json` (renderer/shared). The two tsconfigs are separate composite projects with different `lib`/`types` (node vs DOM) — put main-process code in the node project's includes and UI code in the web project's.

## Platform

Target and validate on **Windows x64** from the start. The shell is PowerShell. The packaging target is the NSIS `.exe` (`build:win`).
