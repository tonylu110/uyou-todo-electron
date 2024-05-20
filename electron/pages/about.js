import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import remoteMain from '@electron/remote/main/index.js'
import { menuBlur, micaStyle } from '../store/menuBlurStore.js'
import setMicaStyle from './util/setMicaStyle.js'

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
    icon: path.join(__dirname, '../../dist/logo.png'),
    background: '#00000000',
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
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
  if (NODE_ENV === 'development') {
    aboutWindow.loadURL('http://localhost:3000/#/about?isWin=true')
  }
  else {
    aboutWindow.loadFile(path.join(__dirname, '../../dist/index.html'), {
      hash: '/about?isWin=true',
    })
  }
  remoteMain.enable(aboutWindow.webContents)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
  return aboutWindow
}

export default createAboutWindow
