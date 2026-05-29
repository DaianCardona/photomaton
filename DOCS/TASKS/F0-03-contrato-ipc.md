# F0-03 · Contrato IPC tipado + preload seguro

**Fase:** 0 · Cimientos
**Depende de:** F0-01
**Estimación:** M (1 día)

## Objetivo
Establecer el mecanismo de comunicación renderer↔main **tipado y seguro**, con los contratos en
`src/shared/`, de modo que el resto de tareas (eventos, ajustes, hardware) cuelguen de él sin
reinventar el cableado.

## Subtareas
- [ ] Definir `src/shared/ipc-contract.ts`: nombres de canal + tipos de request/response por canal.
- [ ] Definir `src/shared/models.ts`: tipos base (`Event`, `Session`, `Template`, `Settings`, `DeviceInfo`…), aunque vacíos/parciales en Fase 0.
- [ ] Implementar **preload** que expone una API mínima y tipada vía `contextBridge` (sin exponer `ipcRenderer` crudo).
- [ ] Implementar un **registrador de handlers** en `src/main/ipc/` (patrón: cada servicio registra sus handlers; los handlers son finos y delegan en el servicio).
- [ ] Tipado compartido del lado renderer (`window.api` tipado).
- [ ] Canal de ejemplo `ping`/`app:getVersion` para validar el ida y vuelta.
- [ ] Gestión de errores IPC consistente (formato de error común).
- [ ] Test unitario del contrato (mock de IPC).

## Criterios de aceptación
- El renderer llama a `window.api.app.getVersion()` (o similar) y recibe la respuesta del main, **tipada**.
- No se expone `ipcRenderer` ni Node al renderer (solo la API del `contextBridge`).
- Añadir un nuevo canal es declarativo (un sitio para el tipo, un sitio para el handler).
- Errores del main llegan al renderer con un formato uniforme.

## Referencias
- [arquitectura-general](../01-arquitectura/arquitectura-general.md) (IPC, contextIsolation)
- [estructura-proyecto](../01-arquitectura/estructura-proyecto.md) (`shared/`, `ipc/`, `preload/`)

## Notas
- Este contrato es la **columna vertebral**: invertir en que sea ergonómico y tipado ahorra fricción en todas las fases siguientes.
- Considerar validación de payloads (zod) si se quiere robustez extra.
