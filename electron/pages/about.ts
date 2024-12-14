import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import remoteMain from '@electron/remote/main/index.js'
import { menuBlur, micaStyle } from '../store/menuBlurStore.ts'
import setMicaStyle from './util/setMicaStyle.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

let aboutWindow

function createAboutWindow() {
  aboutWindow = new MicaBrowserWindow({
    width: 450,
    height: 350,
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
      aboutWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', aboutWindow)
    }
    else {
      aboutWindow.setAcrylic()
    }
  }
  aboutWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development')
    aboutWindow.loadURL('http://localhost:3000/electronWindows/about/')
  else
    aboutWindow.loadFile(path.join(__dirname, '../dist/electronWindows/about/index.html'))

  remoteMain.enable(aboutWindow.webContents)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
  return aboutWindow
}

export default createAboutWindow
