import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let aboutWindow

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 350,
    height: 450,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../../dist/logo.png'),
    vibrancy: 'menu',
    titleBarStyle: 'hidden',
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      defaultFontFamily: {
        standard: 'Helvetica',
        serif: 'Times',
        sansSerif: 'Helvetica',
        monospace: 'Menlo',
      },
    },
  })
  aboutWindow.setAlwaysOnTop(true)
  if (isDev)
    aboutWindow.loadURL('http://localhost:3000/electronWindows/about/')
  else
    aboutWindow.loadFile(path.join(__dirname, '../../dist/electronWindows/about/index.html'))

  ipcMain.on('setTitleBar', (_event, showBar) => {
    aboutWindow.setWindowButtonVisibility(showBar)
  })

  remoteMain.enable(aboutWindow.webContents)
  return aboutWindow
}

export default createAboutWindow
