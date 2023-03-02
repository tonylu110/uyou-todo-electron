const path = require('path');
const { MicaBrowserWindow, IS_WINDOWS_11 } = require("mica-electron");
const about = path.join(__dirname, './register.html');
const setMicaStyle = require('../util/setMicaStyle')
const { micaStyle, menuBlur } = require('../../store/menuBlurStore')

let registerWindow

function createRegisterWindow () {
  registerWindow = new MicaBrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../../../dist/logo.png'),
    background: '#00000000',
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  registerWindow.setLightTheme()

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11) {
      setMicaStyle(micaStyle ? micaStyle : 'mica', registerWindow)
    } else {
      registerWindow.setCustomEffect(4, '#fff6dc', 0.7);
    }
  } else {
    registerWindow.setCaptionColor('#fff6dc')
    registerWindow.setCustomEffect(1, '#fff6dc', 1);
  }
  registerWindow.setAlwaysOnTop(true)

  registerWindow.loadURL(about)

  registerWindow.once('ready-to-show', () => {
    registerWindow.show()
  })

  return registerWindow
}

module.exports = createRegisterWindow