const path = require('node:path')
const { MicaBrowserWindow, IS_WINDOWS_11 } = require('mica-electron')
const { micaStyle, menuBlur } = require('../store/menuBlurStore')
const setMicaStyle = require('./util/setMicaStyle')

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
      repassWindow.setCustomEffect(4, '#fff6dc', 0.7)
    }
  }
  else {
    repassWindow.setCaptionColor('#fff6dc')
    repassWindow.setCustomEffect(1, '#fff6dc', 1)
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

  require('@electron/remote/main').enable(repassWindow.webContents)

  repassWindow.once('ready-to-show', () => {
    repassWindow.show()
  })

  return repassWindow
}

module.exports = createRepassWindow
