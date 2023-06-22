const path = require('node:path')
const { BrowserWindow } = require('electron')

const NODE_ENV = process.env.NODE_ENV

let repassWindow

function createRepassWindow(uname) {
  repassWindow = new BrowserWindow({
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

  repassWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development') {
    repassWindow.loadURL(`http://localhost:3000/#/repass?isWin=true&account=${uname}`)
  }
  else {
    repassWindow.loadFile(path.join(__dirname, '../../../dist/index.html'), {
      hash: `/repass?isWin=true&account=${uname}`,
    })
  }

  require('@electron/remote/main').enable(repassWindow.webContents)

  return repassWindow
}

module.exports = createRepassWindow
