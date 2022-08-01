const { app, BrowserWindow, ipcMain, screen, Menu } = require('electron')
const path = require('path')
const menuTemplate = require('./menu.js')

const NODE_ENV = process.env.NODE_ENV

let mainWindow

function createWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    minHeight: 600,
    minWidth: 800,
    icon: path.join(__dirname, '../dist/logo.png'),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL(
    NODE_ENV === "development"
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, `../dist/index.html`)}`
  )

  mainWindow.setMaximizable(false)

  if (NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  ipcMain.on("window-min", () => mainWindow.minimize());
  ipcMain.on("window-max", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on("window-close", () => {
    app.quit();
  });
  ipcMain.on("window-on-top", (event, arg) => {
    mainWindow.setAlwaysOnTop(arg)
  });
}

app.whenReady().then(() => {
  const { height } = screen.getPrimaryDisplay().workAreaSize

  createWindow()

  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height));

  Menu.setApplicationMenu(null);

  if (process.platform == 'darwin') {
    Menu.setApplicationMenu(appMenu)
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})