/**
 * Ajustes de la aplicación compartidos main ↔ renderer.
 * Stub inicial del andamiaje (F0-01).
 */

export type Locale = 'es' | 'fr' | 'eu'

export interface AppSettings {
  /** Idioma de la interfaz (coherente con la web DecaBox: es/fr/eu). */
  locale: Locale
  /** Modo invitado bloqueado (kiosko) frente a modo operador. */
  kioskMode: boolean
  /** Carpeta raíz donde se guardan los eventos y medios. */
  dataDir: string | null
}

export const DEFAULT_SETTINGS: AppSettings = {
  locale: 'es',
  kioskMode: false,
  dataDir: null
}
