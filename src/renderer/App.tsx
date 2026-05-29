import { useEffect, useState } from 'react'
import type { AppInfo } from '@shared/ipc-contract'
import { cn } from '@renderer/lib/utils'

function App(): JSX.Element {
  const [info, setInfo] = useState<AppInfo | null>(null)

  useEffect(() => {
    // Demuestra el puente seguro preload → main (sin acceso directo a Node).
    window.api
      .getAppInfo()
      .then(setInfo)
      .catch((err) => console.error('No se pudo obtener AppInfo:', err))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8 text-foreground">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          DecaBox
        </span>
        <h1 className="bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-5xl font-bold text-transparent">
          Hola DecaBox
        </h1>
        <p className="text-muted-foreground">Photomaton · andamiaje Electron + React</p>
      </div>

      <div
        className={cn(
          'grid w-full max-w-md grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border text-sm'
        )}
      >
        <InfoCell label="App" value={info?.name} />
        <InfoCell label="Versión" value={info?.version} />
        <InfoCell label="Electron" value={info?.electron} />
        <InfoCell label="Chromium" value={info?.chrome} />
        <InfoCell label="Node" value={info?.node} />
        <InfoCell label="Puente IPC" value={info ? 'OK' : '…'} />
      </div>
    </main>
  )
}

function InfoCell({ label, value }: { label: string; value?: string }): JSX.Element {
  return (
    <div className="flex flex-col gap-1 bg-card p-4">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="font-mono text-foreground">{value ?? '—'}</span>
    </div>
  )
}

export default App
