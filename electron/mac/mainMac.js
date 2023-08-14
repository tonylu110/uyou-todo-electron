const path = require('node:path')
const { app, BrowserWindow, ipcMain, screen, Menu, shell, nativeTheme, globalShortcut, Tray } = require('electron')
const Store = require('electron-store')
const remoteMain = require('@electron/remote/main')
const { initWindowSize, windowSize, windowSizeState, windowSizeIpc } = require('../store/windowSizeStore')
const { initSystemBar, systemBar, systemBarIpc } = require('../store/systemTitleBarStore')
const { initMenuBlur, menuBlur, menuBlurIpc } = require('../store/menuBlurStore')
const { initWindowMenu, windowMenu, windowMenuIpc } = require('../store/windowMenuStore')
const { initSim, simple, simpleIpc } = require('../store/simpleModeStore')
const sendNotification = require('../pages/util/sendNotification')
const i18n = require('../i18n')
const createAboutWindowMac = require('./pages/aboutMac')
const createRegisterWindowMac = require('./pages/registerMac')
const createRepassWindowMac = require('./pages/repassMac')
const createLogoffWindowMac = require('./pages/logoffMac')
const menuTemplate = require('./menu.js')

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

  mainWindow = new BrowserWindow({
    width: simple ? 370 : 1000,
    height: 750,
    minHeight: simple ? 500 : 600,
    minWidth: simple ? 290 : 400,
    maxWidth: simple ? 400 : null,
    maximizable: !simple,
    x: store.get('window-pos') ? store.get('window-pos')[0] : (width - (simple ? 350 : 1000)) / 2,
    y: store.get('window-pos') ? store.get('window-pos')[1] : (height - (simple ? 700 : 750)) / 2,
    vibrancy: (menuBlur || menuBlur === undefined) ? 'menu' : null,
    visualEffectState: 'active',
    icon: path.join(__dirname, '../../dist/logo.png'),
    frame: systemBar,
    titleBarStyle: systemBar ? 'default' : 'hiddenInset',
    trafficLightPosition: { x: 15, y: simple ? 20 : 15 },
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (windowSizeState)
    mainWindow.setSize(windowSize.width, windowSize.height)

  remoteMain.enable(mainWindow.webContents)

  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../dist/index.html')}`,
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
  ipcMain.on('window-close', (ev, isClose) => {
    if (isClose)
      app.quit()
    else
      mainWindow.hide()
  })
  ipcMain.on('window-on-top', (event, arg) => {
    mainWindow.setAlwaysOnTop(arg)
  })

  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url)
  })

  ipcMain.on('setAddItemCut', (event, use) => {
    if (use) {
      globalShortcut.register('Alt+A', () => {
        mainWindow.webContents.send('useKeyAddItem')
      })
    }
    else {
      globalShortcut.unregister('Alt+A')
    }
  })

  windowSizeIpc()
  systemBarIpc()
  menuBlurIpc()
  windowMenuIpc()
  simpleIpc()

  ipcMain.on('open-about', () => {
    const aboutWindow = createAboutWindowMac()

    ipcMain.once('close-about', () => {
      aboutWindow.close()
    })
  })

  ipcMain.on('open-register', () => {
    const registerWindow = createRegisterWindowMac()
    const registerId = registerWindow.id

    ipcMain.once('close-register', () => {
      BrowserWindow.fromId(registerId).close()
    })
  })

  ipcMain.on('open-repass', (ev, uname) => {
    const repassWindow = createRepassWindowMac(uname)
    const repassId = repassWindow.id

    ipcMain.once('close-repass', () => {
      BrowserWindow.fromId(repassId).close()
    })
  })

  ipcMain.on('open-logoff', (ev, uname) => {
    const logoffWindow = createLogoffWindowMac(uname)
    const logoffId = logoffWindow.id

    ipcMain.once('close-logoff', () => {
      BrowserWindow.fromId(logoffId).close()
    })
  })

  ipcMain.on('setAutoStart', (ev, isAutoStart) => {
    app.setLoginItemSettings({
      openAtLogin: isAutoStart,
    })
  })

  ipcMain.on('colorMode', (ev, color) => {
    nativeTheme.themeSource = color
  })

  mainWindow.on('move', () => {
    store.set('window-pos', mainWindow.getPosition())
  })

  ipcMain.on('set-notification-timer', (ev, time, title, msg) => {
    const timeoutFn = () => {
      const send = sendNotification(title, msg)
      send.show()
      send.on('click', () => {
        mainWindow.show()
      })
    }

    if (time > 0)
      setTimeout(timeoutFn, time)
  })
}

let tray

app.whenReady().then(() => {
  if (process.platform === 'win32')
    app.setAppUserModelId('uyou ToDo')

  const { height } = screen.getPrimaryDisplay().workAreaSize

  createWindow()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  tray = new Tray(path.join(__dirname, '../dist/logo.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: i18n(app).open, click: () => mainWindow.show() },
    { label: i18n(app).quit, click: () => app.quit() },
  ])
  tray.setToolTip('uyou ToDo')
  tray.setContextMenu(contextMenu)

  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height))

  Menu.setApplicationMenu(null)

  if (process.platform === 'darwin' || windowMenu)
    Menu.setApplicationMenu(appMenu)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})
