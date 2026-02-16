import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import isDev from 'electron-is-dev'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import { menuBlur, micaStyle } from '../store/menuBlurStore.js'
import setMicaStyle from './util/setMicaStyle.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let logoffWindow

function createLogoffWindow(uname) {
  logoffWindow = new MicaBrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
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
      logoffWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', logoffWindow)
    }
    else {
      logoffWindow.setAcrylic()
    }
  }
  logoffWindow.setAlwaysOnTop(true)
  if (isDev)
    logoffWindow.loadURL(`http://localhost:3000/electron_windows/pages/logoff/`)
  else
    logoffWindow.loadFile(path.join(__dirname, '../dist/electron_windows/pages/logoff/index.html'))

  remoteMain.enable(logoffWindow.webContents)
  logoffWindow.once('ready-to-show', () => {
    logoffWindow.show()
    logoffWindow.webContents.send('getUserName', uname)
  })
  return logoffWindow
}

export default createLogoffWindow
