import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, Menu, Tray, app, dialog, globalShortcut, ipcMain, nativeTheme, screen, shell } from 'electron'
import Store from 'electron-store'
import remoteMain from '@electron/remote/main/index.js'
import { initWindowSize, windowSize, windowSizeIpc, windowSizeState } from '../store/windowSizeStore.js'
import { initSystemBar, systemBar, systemBarIpc } from '../store/systemTitleBarStore.js'
import { initMenuBlur, menuBlur, menuBlurIpc } from '../store/menuBlurStore.js'
import { initWindowMenu, windowMenu, windowMenuIpc } from '../store/windowMenuStore.js'
import { initSim, simple, simpleIpc } from '../store/simpleModeStore.js'
import sendNotification from '../pages/util/sendNotification.js'
import i18n from '../i18n/index.js'
import useFontSize from '../useFontSize.js'
import createAboutWindowMac from './pages/aboutMac.js'
import createRegisterWindowMac from './pages/registerMac.js'
import createRepassWindowMac from './pages/repassMac.js'
import createLogoffWindowMac from './pages/logoffMac.js'
import menuTemplate from './menu.js'
import { writeFile, readFile } from '../pages/util/rnwFile.js'

const store = new Store()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

// eslint-disable-next-line node/prefer-global/process
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

remoteMain.initialize()

let mainWindow

function createWindow() {
  const {
    width,
    height,
  } = screen.getPrimaryDisplay().workAreaSize
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
    vibrancy: menuBlur || menuBlur === undefined ? 'menu' : null,
    visualEffectState: 'active',
    icon: path.join(__dirname, '../../dist/logo.png'),
    frame: systemBar,
    titleBarStyle: systemBar ? 'default' : 'hidden',
    trafficLightPosition: {
      x: 15,
      y: simple ? 20 : 17,
    },
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload.mjs'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      scrollBounc: true,
      defaultFontFamily: {
        standard: 'Helvetica',
        serif: 'Times',
        sansSerif: 'Helvetica',
        monospace: 'Menlo'
      }
    },
  })
  if (windowSizeState)
    mainWindow.setSize(windowSize.width, windowSize.height)
  remoteMain.enable(mainWindow.webContents)
  mainWindow.loadURL(NODE_ENV === 'development' ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)

  // mainWindow.setMaximizable(false)

  if (NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({
      mode: 'detach',
    })
  }
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
  ipcMain.on('setFont', () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{
        name: 'Fonts',
        extensions: ['ttf'],
      }],
    }).then((result) => {
      const filePath = result.filePaths[0]
      if (filePath) {
        const fontName = path.basename(filePath)
        const fontCss = `
          @font-face {
            font-family: 'cus_font';
            src: url('file://${filePath}');
          }
          * {
            font-family: 'cus_font', sans-serif;
          }
        `
        fs.writeFileSync(path.join(__dirname, 'selectedFont.css'), fontCss)
        mainWindow.webContents.insertCSS(fontCss)
        mainWindow.webContents.send('getFontName', fontName.slice(0, -4))
      }
    }).catch((err) => {
      console.error(err)
    })
  })
  ipcMain.on('setBoldFont', () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{
        name: 'Fonts',
        extensions: ['ttf'],
      }],
    }).then((result) => {
      const filePath = result.filePaths[0]
      if (filePath) {
        const fontName = path.basename(filePath)
        const fontCss = `
          @font-face {
            font-family: 'cus_font';
            font-weight: bold;
            src: url('file://${filePath}');
          }
          * {
            font-family: 'cus_font', sans-serif;
          }
        `
        fs.writeFileSync(path.join(__dirname, 'selectedBoldFont.css'), fontCss)
        mainWindow.webContents.insertCSS(fontCss)
        mainWindow.webContents.send('getFontNameBold', fontName.slice(0, -4))
      }
    }).catch((err) => {
      console.error(err)
    })
  })
  ipcMain.on('initFont', (ev, useFont, fontSize) => {
    if (useFont) {
      mainWindow.webContents.insertCSS(useFontSize(fontSize, true))
      fs.readFile(path.join(__dirname, 'selectedFont.css'), 'utf-8', (err, data) => {
        if (err)
          return
        mainWindow.webContents.insertCSS(data)
      })
      fs.readFile(path.join(__dirname, 'selectedBoldFont.css'), 'utf-8', (err, data) => {
        if (err)
          return
        mainWindow.webContents.insertCSS(data)
      })
    }
  })
  ipcMain.on('setFontSize', (ev, size) => {
    mainWindow.webContents.insertCSS(useFontSize(size))
  })
  ipcMain.on('writeFile', (ev, name, text, ext) => {
    const file = writeFile(name, text, ext)
    ev.reply('writeFile', file)
  })
  ipcMain.on('readFile', (ev, ext) => {
    const fileText = readFile(ext)
    ev.reply('readFile', fileText)
  })
}
let tray
app.whenReady().then(() => {
  // eslint-disable-next-line node/prefer-global/process
  if (process.platform === 'win32')
    app.setAppUserModelId('uyou ToDo')
  const {
    height,
  } = screen.getPrimaryDisplay().workAreaSize
  createWindow()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  tray = new Tray(path.join(__dirname, '../dist/logo.png'))
  const contextMenu = Menu.buildFromTemplate([{
    label: i18n(app).open,
    click: () => mainWindow.show(),
  }, {
    label: i18n(app).quit,
    click: () => app.quit(),
  }])
  tray.setToolTip('uyou ToDo')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => mainWindow.show())
  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height))
  Menu.setApplicationMenu(null)

  // eslint-disable-next-line node/prefer-global/process
  if (process.platform === 'darwin' || windowMenu)
    Menu.setApplicationMenu(appMenu)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})
app.on('window-all-closed', () => {
  // eslint-disable-next-line node/prefer-global/process
  if (process.platform !== 'darwin')
    app.quit()
})
