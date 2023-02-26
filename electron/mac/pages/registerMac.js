const path = require('path');
const { BrowserWindow } = require("electron");
const about = path.join(__dirname, '../../pages/register/register.html');

let registerWindow

function createRegisterWindow () {
  registerWindow = new BrowserWindow({
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

  registerWindow.setAlwaysOnTop(true)
  registerWindow.loadURL(`file://${about}`)

  return registerWindow
}

module.exports = createRegisterWindow