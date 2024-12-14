import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import remoteMain from '@electron/remote/main/index.js'
import { menuBlur, micaStyle } from '../store/menuBlurStore.js'
import setMicaStyle from './util/setMicaStyle.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

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
        monospace: 'Courier New'
      }
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
  if (NODE_ENV === 'development')
    logoffWindow.loadURL(`http://localhost:3000/electronWindows/logoff/`)
  else
    logoffWindow.loadFile(path.join(__dirname, '../dist/electronWindows/logoff/index.html'))

  remoteMain.enable(logoffWindow.webContents)
  logoffWindow.once('ready-to-show', () => {
    logoffWindow.show()
    logoffWindow.webContents.send('getUserName', uname)
  })
  return logoffWindow
}

export default createLogoffWindow
