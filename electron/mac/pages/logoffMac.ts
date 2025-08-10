import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let logoffWindow

function createLogoffWindow(uname) {
  logoffWindow = new BrowserWindow({
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
  logoffWindow.setAlwaysOnTop(true)
  if (isDev)
    logoffWindow.loadURL(`http://localhost:3000/electron_windows/logoff/`)
  else
    logoffWindow.loadFile(path.join(__dirname, '../../dist/electron_windows/logoff/index.html'))

  remoteMain.enable(logoffWindow.webContents)
  logoffWindow.once('ready-to-show', () => {
    logoffWindow.webContents.send('getUserName', uname)
  })
  return logoffWindow
}

export default createLogoffWindow
