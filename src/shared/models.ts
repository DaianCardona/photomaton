/**
 * Modelos de dominio compartidos main ↔ renderer.
 *
 * Stubs iniciales del andamiaje (F0-01). Se irán completando en las tareas de
 * cada subsistema (evento, captura, plantillas, sync, …).
 */

export type Uuid = string
/** ISO-8601, p. ej. "2026-05-29T18:30:00.000Z". */
export type IsoDateTime = string

export interface EventInfo {
  id: Uuid
  name: string
  date: IsoDateTime
  createdAt: IsoDateTime
}

export interface Session {
  id: Uuid
  eventId: Uuid
  startedAt: IsoDateTime
  photoIds: Uuid[]
}

export interface Photo {
  id: Uuid
  sessionId: Uuid
  /** Ruta local del archivo dentro de la carpeta del evento. */
  path: string
  takenAt: IsoDateTime
}

export interface Template {
  id: Uuid
  name: string
  /** Número de huecos de foto del montaje. */
  slots: number
}
