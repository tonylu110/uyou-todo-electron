import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import isDev from 'electron-is-dev'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import { menuBlur, micaStyle } from '../store/menuBlurStore.js'
import setMicaStyle from './util/setMicaStyle.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let registerWindow

function createRegisterWindow() {
  registerWindow = new MicaBrowserWindow({
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
      registerWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', registerWindow)
    }
    else {
      registerWindow.setAcrylic()
    }
  }
  registerWindow.setAlwaysOnTop(true)
  if (isDev)
    registerWindow.loadURL('http://localhost:3000/electron_windows/pages/register/')
  else
    registerWindow.loadFile(path.join(__dirname, '../dist/electron_windows/pages/register/index.html'))

  remoteMain.enable(registerWindow.webContents)
  registerWindow.once('ready-to-show', () => {
    registerWindow.show()
  })
  return registerWindow
}
export default createRegisterWindow
