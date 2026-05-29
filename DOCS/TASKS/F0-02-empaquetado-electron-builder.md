# F0-02 · Empaquetado e instalador (electron-builder)

**Fase:** 0 · Cimientos
**Depende de:** F0-01
**Estimación:** S (medio día)

## Objetivo
Poder generar un **instalador para Windows** (`.exe` NSIS y/o MSI) que se instale en la Surface, con
icono y metadatos de la app, sentando la base para distribución y actualizaciones.

## Subtareas
- [ ] Añadir y configurar **electron-builder** (`electron-builder.yml`).
- [ ] Definir `appId`, `productName` (DecaBox Fotomatón), versión, icono (`resources/icon.ico`).
- [ ] Target Windows: **NSIS** (instalador) y opcionalmente **portable**.
- [ ] Script `npm run dist` que empaqueta la app.
- [ ] Verificar que los **binarios de `resources/`** (ffmpeg, futuras DLL del EDSDK) se incluyen y se resuelven en runtime (dev vs empaquetado).
- [ ] Documentar el proceso de build del instalador.
- [ ] (Opcional, dejar preparado) auto-update: estructura para `electron-updater` sin activarlo aún.

## Criterios de aceptación
- `npm run dist` produce un instalador `.exe` que instala y ejecuta la app en Windows 10/11 x64.
- La app instalada arranca correctamente (no solo en modo dev).
- El icono y el nombre del producto aparecen bien en el instalador y en la app instalada.
- Las rutas a recursos empaquetados funcionan tanto en dev como instalado.

## Referencias
- [stack-tecnologico](../01-arquitectura/stack-tecnologico.md) (empaquetado)
- [requisitos-no-funcionales](../00-vision/requisitos-no-funcionales.md) (RNF-011, RNF-020)

## Notas
- La **firma de código** queda fuera de Fase 0 (se valora más adelante para evitar alertas de SmartScreen); dejar el hueco en la config.
- Probar la instalación en la propia Surface lo antes posible.
