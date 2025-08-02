import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let registerWindow

function createRegisterWindow() {
  registerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
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
  registerWindow.setAlwaysOnTop(true)
  if (isDev)
    registerWindow.loadURL('http://localhost:3000/electronWindows/register/')
  else
    registerWindow.loadFile(path.join(__dirname, '../../dist/electronWindows/register/index.html'))

  remoteMain.enable(registerWindow.webContents)
  return registerWindow
}

export default createRegisterWindow
