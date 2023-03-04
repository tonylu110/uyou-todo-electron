const { app, BrowserWindow, ipcMain, screen, Menu, shell } = require('electron')
const Store = require('electron-store')
const path = require('path')
const menuTemplate = require('./menu.js')
const remoteMain = require('@electron/remote/main')
const { initWindowSize, windowSize, windowSizeState, windowSizeIpc } = require('./store/windowSizeStore')
const { initSystemBar, systemBar, systemBarIpc } = require('./store/systemTitleBarStore')
const { initMenuBlur, menuBlur, menuBlurIpc, micaStyle } = require('./store/menuBlurStore')
const { initWindowMenu, windowMenu, windowMenuIpc } = require('./store/windowMenuStore')
const { PARAMS, VALUE,  MicaBrowserWindow, IS_WINDOWS_11 } = require('mica-electron')
const createAboutWindow = require("./pages/about/about");
const createRegisterWindow = require("./pages/register/register")
const createRepassWindow = require('./pages/repass/repass')
const { langIpc, initLang, lang} = require("./store/languageStore");
const setMicaStyle = require('./pages/util/setMicaStyle')
const { initSim, simple, simpleIpc } = require('./store/simpleModeStore')

const store = new Store()

const NODE_ENV = process.env.NODE_ENV

remoteMain.initialize();

let mainWindow

function createWindow() {
  initWindowSize()
  initSystemBar()
  initMenuBlur()
  initWindowMenu()
  initLang()
  initSim()

  mainWindow = new MicaBrowserWindow({
    width: simple ? 350 : 1000,
    height: simple ? 700 : 750,
    minHeight: 600,
    minWidth: simple ? 350 : 800,
    maxWidth: simple ? 400 : null,
    maximizable: !simple,
    icon: path.join(__dirname, '../dist/logo.png'),
    frame: systemBar,
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

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11) {
      mainWindow.setLightTheme()
      setMicaStyle(micaStyle ? micaStyle : 'mica', mainWindow)
    } else {
      mainWindow.setCustomEffect(4, simple ? '#eeeeee' : '#fff6dc', 0.7);
    }
  } else {
    mainWindow.setCaptionColor('#fff6dc')
    mainWindow.setCustomEffect(1, simple ? '#eeeeee' : '#fff6dc', 1);
  }

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

  const { height } = screen.getPrimaryDisplay().workAreaSize
  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height));

  windowSizeIpc()
  systemBarIpc()
  menuBlurIpc()
  windowMenuIpc(appMenu)
  langIpc()
  simpleIpc()

  let aboutId, regId, rePassId

  ipcMain.on('open-about', () => {
    let aboutWindow = createAboutWindow()

    aboutId = aboutWindow.id

    ipcMain.once("close-about", () => {
      aboutWindow.close()
    });
    ipcMain.once("get-app-version", (event) => {
      event.sender.send('version', app.getVersion())
    })
  })

  ipcMain.on('open-register', () => {
    let registerWindow = createRegisterWindow()

    regId = registerWindow.id

    registerWindow.once('ready-to-show', () => {
      registerWindow.webContents.send('lang', lang)
    })

    ipcMain.once('close-register', () => {
      registerWindow.close()
    })
  })

  ipcMain.on('open-repass', (ev, uname) => {
    let repassWindow = createRepassWindow()

    rePassId = repassWindow.id

    repassWindow.once('ready-to-show', () => {
      repassWindow.webContents.send('account', uname)
      repassWindow.webContents.send('lang', lang)
    })

    ipcMain.once('close-repass', () => {
      repassWindow.close()
    })
  })

  ipcMain.on('changeBlur', (ev, effect) => {
    setMicaStyle(effect, mainWindow)
    store.set('micaStyle', effect)
  })
}

app.whenReady().then(() => {
  createWindow()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  const { height } = screen.getPrimaryDisplay().workAreaSize
  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height));

  Menu.setApplicationMenu(windowMenu ? appMenu : null);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})