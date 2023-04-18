const { app, BrowserWindow, ipcMain, screen, Menu, shell, nativeTheme } = require('electron')
const path = require('path')
const Store = require('electron-store')
const menuTemplate = require('./menu.js')
const remoteMain = require('@electron/remote/main')
const { initWindowSize, windowSize, windowSizeState, windowSizeIpc } = require('../store/windowSizeStore')
const { initSystemBar, systemBar, systemBarIpc } = require('../store/systemTitleBarStore')
const { initMenuBlur, menuBlur, menuBlurIpc } = require('../store/menuBlurStore')
const { initWindowMenu, windowMenu, windowMenuIpc } = require('../store/windowMenuStore')
const createAboutWindowMac = require("./pages/aboutMac");
const createRegisterWindowMac = require("./pages/registerMac");
const createRepassWindowMac = require("./pages/repassMac");
const createLogoffWindowMac = require("./pages/logoffMac");
const { initSim, simple, simpleIpc } = require('../store/simpleModeStore')

const store = new Store()

const NODE_ENV = process.env.NODE_ENV

remoteMain.initialize();

let mainWindow

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    initWindowSize()
    initSystemBar()
    initMenuBlur()
    initWindowMenu()
    initSim()

    mainWindow = new BrowserWindow({
        width: simple ? 350 : 1000,
        height: simple ? 700 : 750,
        minHeight: 600,
        minWidth: simple ? 350 : 800,
        maxWidth: simple ? 400 : null,
        maximizable: !simple,
        x: store.get('window-pos') ? store.get('window-pos')[0] : (width - (simple ? 350 : 1000)) / 2,
        y: store.get('window-pos') ? store.get('window-pos')[1] : (height - (simple ? 700 : 750)) / 2,
        vibrancy: (menuBlur || menuBlur === undefined) ? 'menu' : null,
        visualEffectState: 'active',
        icon: path.join(__dirname, '../../dist/logo.png'),
        frame: systemBar,
        titleBarStyle: systemBar ? 'default' : 'hiddenInset',
        trafficLightPosition: { x: 10, y: simple ? 13 : 10 },
        show: false,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
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
            : `file://${path.join(__dirname, `../../dist/index.html`)}`
    )

    // mainWindow.setMaximizable(false)

    if (NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    nativeTheme.themeSource = "light"

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
    simpleIpc()

    ipcMain.on('open-about', () => {
        let aboutWindow = createAboutWindowMac()

        ipcMain.once("close-about", () => {
            aboutWindow.close()
        });
        ipcMain.once("get-app-version", (event) => {
            event.sender.send('version', app.getVersion())
        })
    })

    ipcMain.on('open-register', () => {
        let registerWindow = createRegisterWindowMac()
        const registerId = registerWindow.id

        ipcMain.once('close-register', () => {
            BrowserWindow.fromId(registerId).close()
        })
    })

    ipcMain.on('open-repass', (ev, uname) => {
        let repassWindow = createRepassWindowMac(uname)
        const repassId = repassWindow.id

        ipcMain.once('close-repass', () => {
            BrowserWindow.fromId(repassId).close()
        })
    })

    ipcMain.on('open-logoff', (ev, uname) => {
        let logoffWindow = createLogoffWindowMac(uname)
        const logoffId = logoffWindow.id

        ipcMain.once('close-logoff', () => {
            BrowserWindow.fromId(logoffId).close()
        })
    })

    ipcMain.on('setAutoStart', (ev, isAutoStart) => {
        app.setLoginItemSettings({
            openAtLogin: isAutoStart
        })
    })

    mainWindow.on('move', () => {
        store.set('window-pos', mainWindow.getPosition())
    })
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