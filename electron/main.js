const path = require('node:path')
const { app, BrowserWindow, ipcMain, screen, Menu, shell } = require('electron')
const Store = require('electron-store')
const remoteMain = require('@electron/remote/main')
const { PARAMS, VALUE, MicaBrowserWindow, IS_WINDOWS_11 } = require('mica-electron')
const menuTemplate = require('./menu.js')
const { initWindowSize, windowSize, windowSizeState, windowSizeIpc } = require('./store/windowSizeStore')
const { initSystemBar, systemBar, systemBarIpc } = require('./store/systemTitleBarStore')
const { initMenuBlur, menuBlur, menuBlurIpc, micaStyle } = require('./store/menuBlurStore')
const { initWindowMenu, windowMenu, windowMenuIpc } = require('./store/windowMenuStore')
const createAboutWindow = require('./pages/about')
const createRegisterWindow = require('./pages/register')
const createRepassWindow = require('./pages/repass')
const createLogoffWindow = require('./pages/logoff')
const setMicaStyle = require('./pages/util/setMicaStyle')
const { initSim, simple, simpleIpc } = require('./store/simpleModeStore')

const store = new Store()

const NODE_ENV = process.env.NODE_ENV

remoteMain.initialize()

let mainWindow

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  initWindowSize()
  initSystemBar()
  initMenuBlur()
  initWindowMenu()
  initSim()

  mainWindow = new MicaBrowserWindow({
    width: simple ? 350 : 1000,
    height: simple ? 700 : 750,
    minHeight: 600,
    minWidth: simple ? 350 : 800,
    maxWidth: simple ? 400 : null,
    x: store.get('window-pos') ? store.get('window-pos')[0] : (width - (simple ? 350 : 1000)) / 2,
    y: store.get('window-pos') ? store.get('window-pos')[1] : (height - (simple ? 700 : 750)) / 2,
    maximizable: !simple,
    icon: path.join(__dirname, '../dist/logo.png'),
    frame: systemBar,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (windowSizeState)
    mainWindow.setSize(windowSize.width, windowSize.height)

  remoteMain.enable(mainWindow.webContents)

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11) {
      mainWindow.setLightTheme()
      setMicaStyle(micaStyle || 'mica', mainWindow)
    }
    else {
      mainWindow.setCustomEffect(4, simple ? '#eeeeee' : '#fff6dc', 0.7)
    }
  }
  else {
    mainWindow.setCaptionColor('#fff6dc')
    mainWindow.setCustomEffect(1, simple ? '#eeeeee' : '#fff6dc', 1)
  }

  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`,
  )

  // mainWindow.setMaximizable(false)

  if (NODE_ENV === 'development')
    mainWindow.webContents.openDevTools({ mode: 'detach' })

  ipcMain.on('window-min', () => {
    mainWindow.minimize()
  })
  ipcMain.on('window-max', () => {
    if (mainWindow.isMaximized())
      mainWindow.unmaximize()
    else
      mainWindow.maximize()
  })
  ipcMain.on('window-close', () => {
    app.quit()
  })
  ipcMain.on('window-on-top', (event, arg) => {
    mainWindow.setAlwaysOnTop(arg)
  })

  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url)
  })

  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height))

  windowSizeIpc()
  systemBarIpc()
  menuBlurIpc()
  windowMenuIpc(appMenu)
  simpleIpc()

  let aboutId, regId, rePassId

  ipcMain.on('open-about', () => {
    const aboutWindow = createAboutWindow()

    aboutId = aboutWindow.id

    ipcMain.once('close-about', () => {
      aboutWindow.close()
    })
  })

  ipcMain.on('open-register', () => {
    const registerWindow = createRegisterWindow()

    regId = registerWindow.id

    ipcMain.once('close-register', () => {
      registerWindow.close()
    })
  })

  ipcMain.on('open-repass', (ev, uname) => {
    const repassWindow = createRepassWindow(uname)

    rePassId = repassWindow.id

    ipcMain.once('close-repass', () => {
      repassWindow.close()
    })
  })

  ipcMain.on('open-logoff', (ev, uname) => {
    const logoffWindow = createLogoffWindow(uname)

    ipcMain.once('close-logoff', () => {
      logoffWindow.close()
    })
  })

  ipcMain.on('changeBlur', (ev, effect) => {
    setMicaStyle(effect, mainWindow)
    store.set('micaStyle', effect)
  })

  ipcMain.on('setAutoStart', (ev, isAutoStart) => {
    app.setLoginItemSettings({
      openAtLogin: isAutoStart,
    })
  })

  mainWindow.on('move', () => {
    store.set('window-pos', mainWindow.getPosition())
  })
}

app.whenReady().then(() => {
  createWindow()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  const { height } = screen.getPrimaryDisplay().workAreaSize
  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height))

  Menu.setApplicationMenu(windowMenu ? appMenu : null)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})
