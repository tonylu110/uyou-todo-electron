import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import remoteMain from '@electron/remote/main/index.js'
import { menuBlur, micaStyle } from '../store/menuBlurStore.js'
import setMicaStyle from './util/setMicaStyle.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

let repassWindow

function createRepassWindow(uname) {
  repassWindow = new MicaBrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../../../dist/logo.png'),
    background: '#00000000',
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
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
  if (NODE_ENV === 'development') {
    repassWindow.loadURL(`http://localhost:3000/#/repass?isWin=true&account=${uname}`)
  }
  else {
    repassWindow.loadFile(path.join(__dirname, '../../dist/index.html'), {
      hash: `/repass?isWin=true&account=${uname}`,
    })
  }
  remoteMain.enable(repassWindow.webContents)
  repassWindow.once('ready-to-show', () => {
    repassWindow.show()
  })
  return repassWindow
}

export default createRepassWindow
