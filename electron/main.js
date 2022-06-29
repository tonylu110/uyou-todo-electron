const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 320,
    height: 640,
    maxHeight: 900,
    maxWidth: 600,
    minHeight: 600,
    minWidth: 300,
    icon: path.join(__dirname, '../dist/logo.ico'),
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

  // if (NODE_ENV === 'development') {
  //   mainWindow.webContents.openDevTools()
  // }

  ipcMain.on("window-min", () => mainWindow.minimize());
  ipcMain.on("window-max", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on("window-close", () => {
    mainWindow.destroy();
  });
  ipcMain.on("window-on-top", (event, arg) => {
    mainWindow.setAlwaysOnTop(arg)
  });
}

app.whenReady().then(() => {
  createWindow()

  const { Menu } = require('electron');
  Menu.setApplicationMenu(null);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})