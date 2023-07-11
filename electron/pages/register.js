const path = require('node:path')
const { MicaBrowserWindow, IS_WINDOWS_11 } = require('mica-electron')
const { micaStyle, menuBlur } = require('../store/menuBlurStore')
const setMicaStyle = require('./util/setMicaStyle')

const NODE_ENV = process.env.NODE_ENV

let registerWindow

function createRegisterWindow() {
  registerWindow = new MicaBrowserWindow({
    width: 800,
    height: 600,
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
      registerWindow.setAutoTheme()
      setMicaStyle(micaStyle || 'mica', registerWindow)
    }
    else {
      registerWindow.setCustomEffect(4, '#fff6dc', 0.7)
    }
  }
  else {
    registerWindow.setCaptionColor('#fff6dc')
    registerWindow.setCustomEffect(1, '#fff6dc', 1)
  }
  registerWindow.setAlwaysOnTop(true)

  if (NODE_ENV === 'development') {
    registerWindow.loadURL('http://localhost:3000/#/register?isWin=true')
  }
  else {
    registerWindow.loadFile(path.join(__dirname, '../../dist/index.html'), {
      hash: '/register?isWin=true',
    })
  }

  require('@electron/remote/main').enable(registerWindow.webContents)

  registerWindow.once('ready-to-show', () => {
    registerWindow.show()
  })

  return registerWindow
}

module.exports = createRegisterWindow
