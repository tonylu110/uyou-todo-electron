import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let desktopNoteWindow: Electron.BrowserWindow

function createDesktopNoteWindow(id: number) {
  desktopNoteWindow = new BrowserWindow({
    width: 300,
    height: 450,
    frame: false,
    vibrancy: 'menu',
    icon: path.join(__dirname, '../../dist/logo.png'),
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

  if (isDev)
    desktopNoteWindow.loadURL(`http://localhost:3000/electron_windows/pages/desktopNote/`)
  else
    desktopNoteWindow.loadFile(path.join(__dirname, `../../dist/electron_windows/pages/desktopNote/index.html/`))

  ipcMain.on('setTitleBar', (_event, showBar) => {
    desktopNoteWindow.setWindowButtonVisibility(showBar)
  })

  remoteMain.enable(desktopNoteWindow.webContents)

  desktopNoteWindow.once('ready-to-show', () => {
    ipcMain.removeHandler('getCateId')
    ipcMain.handle('getCateId', () => {
      return id
    })

    ipcMain.on('getContentHeight', (_event, contentHeight) => {
      desktopNoteWindow.setSize(300, contentHeight)
    })
  })
  return desktopNoteWindow
}

export default createDesktopNoteWindow
