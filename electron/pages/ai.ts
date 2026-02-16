import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let aiWindow: Electron.BrowserWindow

function createAiWindow() {
  aiWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    icon: path.join(__dirname, '../dist/logo.png'),
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      defaultFontFamily: {
        standard: 'Times New Roman',
        serif: 'Times New Roman',
        sansSerif: 'Arial',
        monospace: 'Courier New',
      },
    },
  })

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11) {
      aiWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', aiWindow)
    }
    else {
      aiWindow.setAcrylic()
    }
  }

  if (isDev)
    aiWindow.loadURL('http://localhost:3000/electron_windows/ai/')
  else
    aiWindow.loadFile(path.join(__dirname, '../../dist/electron_windows/ai/index.html'))

  aiWindow.once('ready-to-show', () => {
    aiWindow.show()
  })

  remoteMain.enable(aiWindow.webContents)
  return aiWindow
}

export default createAiWindow
