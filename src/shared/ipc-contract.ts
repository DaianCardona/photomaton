/**
 * Contrato IPC: única fuente de los nombres de canal y los tipos de payload que
 * cruzan main ↔ renderer. Tanto el proceso `main` como el `preload`/`renderer`
 * importan de aquí para mantener los tipos sincronizados.
 */

export const IpcChannels = {
  /** Devuelve información de la app y versiones del runtime. */
  appGetInfo: 'app:get-info'
} as const

export type IpcChannel = (typeof IpcChannels)[keyof typeof IpcChannels]

export interface AppInfo {
  name: string
  version: string
  electron: string
  chrome: string
  node: string
}

/**
 * Forma de la API segura expuesta por el `preload` en `window.api`.
 * El renderer sólo puede hablar con el main a través de esta superficie.
 */
export interface PhotomatonApi {
  getAppInfo: () => Promise<AppInfo>
}
