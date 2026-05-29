import type { PhotomatonApi } from '@shared/ipc-contract'

declare global {
  interface Window {
    api: PhotomatonApi
  }
}

export {}
