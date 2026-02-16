import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let aiWindow: Electron.BrowserWindow

function createAiWindow() {
  aiWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    icon: path.join(__dirname, '../../dist/logo.png'),
    vibrancy: 'menu',
    titleBarStyle: 'hidden',
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      defaultFontFamily: {
        standard: 'Helvetica',
        serif: 'Times',
        sansSerif: 'Helvetica',
        monospace: 'Menlo',
      },
    },
  })

  if (isDev)
    aiWindow.loadURL('http://localhost:3000/electron_windows/ai/')
  else
    aiWindow.loadFile(path.join(__dirname, '../../dist/electron_windows/ai/index.html'))

  ipcMain.on('setTitleBar', (_event, showBar) => {
    aiWindow.setWindowButtonVisibility(showBar)
  })

  remoteMain.enable(aiWindow.webContents)
  return aiWindow
}

export default createAiWindow
