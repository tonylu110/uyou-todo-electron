const path = require('node:path')
const { MicaBrowserWindow, IS_WINDOWS_11 } = require('mica-electron')
const { micaStyle, menuBlur } = require('../store/menuBlurStore')
const setMicaStyle = require('./util/setMicaStyle')

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
      aboutWindow.setCustomEffect(4, '#fff6dc', 0.7)
    }
  }
  else {
    aboutWindow.setCaptionColor('#fff6dc')
    aboutWindow.setCustomEffect(1, '#fff6dc', 1)
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

  require('@electron/remote/main').enable(aboutWindow.webContents)

  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })

  return aboutWindow
}

module.exports = createAboutWindow
