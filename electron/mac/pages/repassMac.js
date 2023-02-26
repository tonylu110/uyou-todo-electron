const path = require('path');
const { BrowserWindow } = require("electron");
const repass = path.join(__dirname, '../../pages/repass/repass.html');

let repassWindow

function createRepassWindow () {
  repassWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../../../dist/logo.png'),
    vibrancy: "menu",
    titleBarStyle: 'hidden',
    maximizable: false,
    minimizable: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  repassWindow.setAlwaysOnTop(true)
  repassWindow.loadURL(`file://${repass}`)

  return repassWindow
}

module.exports = createRepassWindow