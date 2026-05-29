# F0-01 · Andamiaje del proyecto Electron

**Fase:** 0 · Cimientos
**Depende de:** —
**Estimación:** M (1–2 días)

## Objetivo
Crear el esqueleto del proyecto Electron + React + TypeScript con la estructura definida en
[estructura-proyecto](../01-arquitectura/estructura-proyecto.md), de forma que la app arranque mostrando
una ventana con React y haya separación main / renderer / shared.

## Subtareas
- [ ] Inicializar repo en `PROYECTOS\PHOTOMATON` (raíz, junto a `DOCS/`); `git init`, `.gitignore`.
- [ ] `package.json` con scripts dev/build/lint/test.
- [ ] Configurar **Electron** + **Vite** (renderer) + **TypeScript** (usar plantilla tipo `electron-vite` o equivalente).
- [ ] Crear estructura de carpetas: `src/main`, `src/preload`, `src/renderer`, `src/shared`, `resources/`, `assets/`, `tests/`.
- [ ] Proceso **main**: crear ventana, ciclo de vida (`ready`, `window-all-closed`), `contextIsolation: true`, `nodeIntegration: false`.
- [ ] Proceso **renderer**: app React 18 mínima (pantalla "Hola DecaBox") con **Tailwind CSS** (+ base de shadcn/ui para reaprovechar el estilo de la web).
- [ ] **preload** vacío pero cableado (puente seguro).
- [ ] Configurar **ESLint + Prettier** y **Vitest** (test de ejemplo).
- [ ] Configurar alias de imports (`@main`, `@renderer`, `@shared`).
- [ ] README de desarrollo (cómo arrancar en dev).

## Criterios de aceptación
- `npm run dev` abre una ventana con la UI React y HMR funcionando.
- `npm run build` genera la app sin errores.
- El renderer **no** tiene acceso directo a Node (`require`/`fs` no disponibles).
- Lint y test base pasan.
- Estructura de carpetas coincide con la documentada.

## Referencias
- [estructura-proyecto](../01-arquitectura/estructura-proyecto.md)
- [stack-tecnologico](../01-arquitectura/stack-tecnologico.md)
- [arquitectura-general](../01-arquitectura/arquitectura-general.md)

## Notas
- Plataforma objetivo Windows x64 (Surface). Validar en Windows desde el principio.
- Mantener versiones alineadas con la web DecaBox donde tenga sentido (React 18, Tailwind).
