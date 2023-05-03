const path = require('path');
const { MicaBrowserWindow, IS_WINDOWS_11 } = require("mica-electron");
const setMicaStyle = require('./util/setMicaStyle')
const { micaStyle, menuBlur } = require('../store/menuBlurStore')
const NODE_ENV = process.env.NODE_ENV

let logoffWindow

function createLogoffWindow (uname) {
  logoffWindow = new MicaBrowserWindow({
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
      contextIsolation: false
    }
  })

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11) {
      logoffWindow.setLightTheme()
      setMicaStyle(micaStyle ? micaStyle : 'mica', logoffWindow)
    } else {
      logoffWindow.setCustomEffect(4, '#fff6dc', 0.7);
    }
  } else {
    logoffWindow.setCaptionColor('#fff6dc')
    logoffWindow.setCustomEffect(1, '#fff6dc', 1);
  }
  logoffWindow.setAlwaysOnTop(true)

  if (NODE_ENV === "development") {
    logoffWindow.loadURL(`http://localhost:3000/#/logoff?isWin=true&account=${uname}`)
  } else {
    logoffWindow.loadFile(path.join(__dirname, `../../dist/index.html`), {
      hash: `/logoff?isWin=true&account=${uname}`
    })
  }

  require("@electron/remote/main").enable(logoffWindow.webContents)

  logoffWindow.once('ready-to-show', () => {
    logoffWindow.show()
  })

  return logoffWindow
}

module.exports = createLogoffWindow