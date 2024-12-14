import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow } from 'electron'
import remoteMain from '@electron/remote/main/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

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
        monospace: 'Menlo'
      }
    },
  })
  logoffWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development')
    logoffWindow.loadURL(`http://localhost:3000/electronWindows/logoff/`)
  else
    logoffWindow.loadFile(path.join(__dirname, '../../dist/electronWindows/logoff/index.html'))

  remoteMain.enable(logoffWindow.webContents)
  logoffWindow.once('ready-to-show', () => {
    logoffWindow.webContents.send('getUserName', uname)
  })
  return logoffWindow
}

export default createLogoffWindow
