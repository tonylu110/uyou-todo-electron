import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow } from 'electron'
import remoteMain from '@electron/remote/main/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

let registerWindow

function createRegisterWindow() {
  registerWindow = new BrowserWindow({
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
  registerWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development')
    registerWindow.loadURL('http://localhost:3000/electronWindows/register/')
  else
    registerWindow.loadFile(path.join(__dirname, '../../../dist/electronWindows/register/index.html'))

  remoteMain.enable(registerWindow.webContents)
  return registerWindow
}

export default createRegisterWindow
