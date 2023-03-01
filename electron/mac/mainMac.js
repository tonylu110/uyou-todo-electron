const { app, BrowserWindow, ipcMain, screen, Menu, shell, nativeTheme } = require('electron')
const path = require('path')
const menuTemplate = require('./menu.js')
const remoteMain = require('@electron/remote/main')
const { initWindowSize, windowSize, windowSizeState, windowSizeIpc } = require('../store/windowSizeStore')
const { initSystemBar, systemBar, systemBarIpc } = require('../store/systemTitleBarStore')
const { initMenuBlur, menuBlur, menuBlurIpc } = require('../store/menuBlurStore')
const { initWindowMenu, windowMenu, windowMenuIpc } = require('../store/windowMenuStore')
const createAboutWindowMac = require("./pages/aboutMac");
const createRegisterWindowMac = require("./pages/registerMac");
const createRepassWindowMac = require("./pages/repassMac");
const { initLang, langIpc, lang} = require("../store/languageStore");

const NODE_ENV = process.env.NODE_ENV

remoteMain.initialize();

let mainWindow

function createWindow() {
    initWindowSize()
    initSystemBar()
    initMenuBlur()
    initWindowMenu()
    initLang()

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 750,
        minHeight: 600,
        minWidth: 800,
        vibrancy: (menuBlur || menuBlur === undefined) ? 'menu' : null,
        visualEffectState: 'active',
        icon: path.join(__dirname, '../../dist/logo.png'),
        frame: systemBar,
        titleBarStyle: systemBar ? 'default' : 'hiddenInset',
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
    langIpc()

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

        registerWindow.once('ready-to-show', () => {
            BrowserWindow.fromId(registerId).webContents.send('lang', lang)
        })

        ipcMain.once('close-register', () => {
            BrowserWindow.fromId(registerId).close()
        })
    })

    ipcMain.on('open-repass', (ev, uname) => {
        let repassWindow = createRepassWindowMac()
        const repassId = repassWindow.id

        repassWindow.once('ready-to-show', () => {
            BrowserWindow.fromId(repassId).webContents.send('account', uname)
            BrowserWindow.fromId(repassId).webContents.send('lang', lang)
        })

        ipcMain.once('close-repass', () => {
            BrowserWindow.fromId(repassId).close()
        })
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