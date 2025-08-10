import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import isDev from 'electron-is-dev'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import { menuBlur, micaStyle } from '../store/menuBlurStore.ts'
import setMicaStyle from './util/setMicaStyle.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let aboutWindow

function createAboutWindow() {
  aboutWindow = new MicaBrowserWindow({
    width: 350,
    height: 450,
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
      aboutWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', aboutWindow)
    }
    else {
      aboutWindow.setAcrylic()
    }
  }
  aboutWindow.setAlwaysOnTop(true)
  if (isDev)
    aboutWindow.loadURL('http://localhost:3000/electron_windows/about/')
  else
    aboutWindow.loadFile(path.join(__dirname, '../dist/electron_windows/about/index.html'))

  remoteMain.enable(aboutWindow.webContents)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
  return aboutWindow
}

export default createAboutWindow
