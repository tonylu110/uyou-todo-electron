const path = require('node:path')
const { BrowserWindow } = require('electron')

const NODE_ENV = process.env.NODE_ENV

let logoffWindow

function createLogoffWindow(uname) {
  logoffWindow = new BrowserWindow({
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

  logoffWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development') {
    logoffWindow.loadURL(`http://localhost:3000/#/logoff?isWin=true&account=${uname}`)
  }
  else {
    logoffWindow.loadFile(path.join(__dirname, '../../../dist/index.html'), {
      hash: `/logoff?isWin=true&account=${uname}`,
    })
  }

  require('@electron/remote/main').enable(logoffWindow.webContents)

  return logoffWindow
}

module.exports = createLogoffWindow
