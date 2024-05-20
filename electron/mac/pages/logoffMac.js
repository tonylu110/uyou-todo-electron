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
    icon: path.join(__dirname, '../../../dist/logo.png'),
    vibrancy: 'menu',
    titleBarStyle: 'hidden',
    maximizable: false,
    minimizable: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  logoffWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development') {
    logoffWindow.loadURL(`http://localhost:3000/#/logoff?isWin=true&account=${uname}`)
  }
  else {
    logoffWindow.loadFile(path.join(__dirname, '../../../dist/index.html'), {
      hash: `/logoff?isWin=true&account=${uname}`,
    })
  }
  remoteMain.enable(logoffWindow.webContents)
  return logoffWindow
}

export default createLogoffWindow
