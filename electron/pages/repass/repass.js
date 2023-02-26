const path = require('path');
const { MicaBrowserWindow } = require("mica-electron");
const repass = path.join(__dirname, './repass.html');

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

  repassWindow.setRoundedCorner()
  repassWindow.setCustomEffect(4, '#edd9b7', 0.5);
  repassWindow.setAlwaysOnTop(true)

  repassWindow.loadURL(repass)

  return repassWindow
}

module.exports = createRepassWindow