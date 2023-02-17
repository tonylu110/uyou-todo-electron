const { app, BrowserWindow, ipcMain, screen, Menu, shell } = require('electron')
const path = require('path')
const menuTemplate = require('./menu.js')
const remoteMain = require('@electron/remote/main')
const { initWindowSize, windowSize, windowSizeState, windowSizeIpc } = require('./store/windowSizeStore')
const { initSystemBar, systemBar, systemBarIpc } = require('./store/systemTitleBarStore')
const { initMenuBlur, menuBlur, menuBlurIpc } = require('./store/menuBlurStore')
const { initWindowMenu, windowMenu, windowMenuIpc } = require('./store/windowMenuStore')

const NODE_ENV = process.env.NODE_ENV

remoteMain.initialize();

let mainWindow

function createWindow() {
    initWindowSize()
    initSystemBar()
    initMenuBlur()
    initWindowMenu()

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 750,
        minHeight: 600,
        minWidth: 800,
        vibrancy: (menuBlur || menuBlur === undefined) ? 'menu' : null,
        visualEffectState: 'active',
        icon: path.join(__dirname, '../dist/logo.png'),
        frame: systemBar,
        titleBarStyle: systemBar ? 'default' : 'hiddenInset',
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (windowSizeState) {
        mainWindow.setSize(windowSize.width, windowSize.height)
    }

    remoteMain.enable(mainWindow.webContents);

    mainWindow.loadURL(
        NODE_ENV === "development"
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, `../dist/index.html`)}`
    )

    // mainWindow.setMaximizable(false)

    if (NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    ipcMain.on("window-min", () => {
        mainWindow.minimize()
    });
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

    ipcMain.on("open-url", (event, url) => {
        shell.openExternal(url)
    })

    windowSizeIpc()
    systemBarIpc()
    menuBlurIpc()
    windowMenuIpc()
}

app.whenReady().then(() => {
    const { height } = screen.getPrimaryDisplay().workAreaSize

    createWindow()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height));

    Menu.setApplicationMenu(null);

    if (process.platform == 'darwin' || windowMenu) {
        Menu.setApplicationMenu(appMenu)
    }

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})