const path = require('path');
const { MicaBrowserWindow } = require("mica-electron");
const about = path.join(__dirname, './register.html');

let registerWindow

function createRegisterWindow () {
  registerWindow = new MicaBrowserWindow({
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

  registerWindow.setRoundedCorner()
  registerWindow.setCustomEffect(4, '#edd9b7', 0.5);
  registerWindow.setAlwaysOnTop(true)

  registerWindow.loadURL(about)

  return registerWindow
}

module.exports = createRegisterWindow