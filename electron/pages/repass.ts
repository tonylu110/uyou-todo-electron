import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import isDev from 'electron-is-dev'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import { menuBlur, micaStyle } from '../store/menuBlurStore.js'
import setMicaStyle from './util/setMicaStyle.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let repassWindow

function createRepassWindow(uname) {
  repassWindow = new MicaBrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../dist/logo.png'),
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
      repassWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', repassWindow)
    }
    else {
      repassWindow.setAcrylic()
    }
  }
  repassWindow.setAlwaysOnTop(true)
  if (isDev)
    repassWindow.loadURL(`http://localhost:3000/electron_windows/repass/`)
  else
    repassWindow.loadFile(path.join(__dirname, '../dist/electron_windows/repass/index.html'))

  remoteMain.enable(repassWindow.webContents)
  repassWindow.once('ready-to-show', () => {
    repassWindow.show()
    repassWindow.webContents.send('getUserName', uname)
  })
  return repassWindow
}

export default createRepassWindow
