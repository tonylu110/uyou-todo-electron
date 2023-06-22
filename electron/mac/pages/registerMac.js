const path = require('node:path')
const { BrowserWindow } = require('electron')

const NODE_ENV = process.env.NODE_ENV

let registerWindow

function createRegisterWindow() {
  registerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../../../dist/logo.png'),
    vibrancy: 'menu',
    titleBarStyle: 'hidden',
    maximizable: false,
    minimizable: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  registerWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development') {
    registerWindow.loadURL('http://localhost:3000/#/register?isWin=true')
  }
  else {
    registerWindow.loadFile(path.join(__dirname, '../../../dist/index.html'), {
      hash: '/register?isWin=true',
    })
  }

  require('@electron/remote/main').enable(registerWindow.webContents)

  return registerWindow
}

module.exports = createRegisterWindow
