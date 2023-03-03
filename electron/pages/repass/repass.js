const path = require('path');
const { MicaBrowserWindow, IS_WINDOWS_11 } = require("mica-electron");
const repass = path.join(__dirname, './repass.html');
const setMicaStyle = require('../util/setMicaStyle')
const { micaStyle, menuBlur } = require('../../store/menuBlurStore')

let repassWindow

function createRepassWindow () {
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
      contextIsolation: false
    }
  })

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11) {
      repassWindow.setLightTheme()
      setMicaStyle(micaStyle ? micaStyle : 'mica', repassWindow)
    } else {
      repassWindow.setCustomEffect(4, '#fff6dc', 0.7);
    }
  } else {
    repassWindow.setCaptionColor('#fff6dc')
    repassWindow.setCustomEffect(1, '#fff6dc', 1);
  }
  repassWindow.setAlwaysOnTop(true)

  repassWindow.loadURL(repass)

  repassWindow.once('ready-to-show', () => {
    repassWindow.show()
  })

  return repassWindow
}

module.exports = createRepassWindow