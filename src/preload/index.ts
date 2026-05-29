import { contextBridge, ipcRenderer } from 'electron'
import { IpcChannels, type AppInfo, type PhotomatonApi } from '@shared/ipc-contract'

/**
 * Puente seguro main ↔ renderer. El renderer corre con `contextIsolation: true`
 * y `nodeIntegration: false`, así que sólo recibe esta API acotada en
 * `window.api`. Mantener la superficie mínima y tipada (ver ipc-contract.ts).
 */
const api: PhotomatonApi = {
  getAppInfo: (): Promise<AppInfo> => ipcRenderer.invoke(IpcChannels.appGetInfo)
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  // Fallback defensivo: nunca debería ocurrir con contextIsolation activado.
  // @ts-expect-error — `window` no tipa `api` fuera del contexto aislado.
  window.api = api
}
