import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import log from 'electron-log/main'
import { IpcChannels, type AppInfo } from '@shared/ipc-contract'

log.initialize()

const isDev = !app.isPackaged

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 640,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0b0b0f',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      // Aislamiento de contexto: el renderer no accede a Node directamente.
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  window.on('ready-to-show', () => window.show())

  // Enlaces externos se abren en el navegador del sistema, no en la app.
  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // En dev cargamos el server de Vite (HMR); empaquetado, el HTML compilado.
  const rendererUrl = process.env['ELECTRON_RENDERER_URL']
  if (isDev && rendererUrl) {
    window.loadURL(rendererUrl)
    window.webContents.openDevTools({ mode: 'detach' })
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return window
}

function registerIpcHandlers(): void {
  ipcMain.handle(IpcChannels.appGetInfo, (): AppInfo => {
    return {
      name: app.getName(),
      version: app.getVersion(),
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node
    }
  })
}

app.whenReady().then(() => {
  log.info('DecaBox Photomaton arrancando…', { isDev })
  registerIpcHandlers()
  createWindow()

  // En macOS es habitual recrear ventana al activar el dock.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// En Windows/Linux cerrar todas las ventanas cierra la app.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
