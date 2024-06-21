import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, Menu, Tray, app, dialog, globalShortcut, ipcMain, nativeTheme, screen, shell } from 'electron'
import Store from 'electron-store'
import remoteMain from '@electron/remote/main/index.js'
import { IS_WINDOWS_11, MicaBrowserWindow } from 'mica-electron'
import menuTemplate from './menu.js'
import { initWindowSize, windowSize, windowSizeIpc, windowSizeState } from './store/windowSizeStore.js'
import { initSystemBar, systemBar, systemBarIpc } from './store/systemTitleBarStore.js'
import { initMenuBlur, menuBlur, menuBlurIpc, micaStyle } from './store/menuBlurStore.js'
import { initWindowMenu, windowMenu, windowMenuIpc } from './store/windowMenuStore.js'
import createAboutWindow from './pages/about.js'
import createRegisterWindow from './pages/register.js'
import createRepassWindow from './pages/repass.js'
import createLogoffWindow from './pages/logoff.js'
import setMicaStyle from './pages/util/setMicaStyle.js'
import { initSim, simple, simpleIpc } from './store/simpleModeStore.js'
import sendNotification from './pages/util/sendNotification.js'
import i18n from './i18n/index.js'
import useFontSize from './useFontSize.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const store = new Store()

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

// eslint-disable-next-line node/prefer-global/process
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

remoteMain.initialize()

Store.initRenderer()

let mainWindow
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  initWindowSize()
  initSystemBar()
  initMenuBlur()
  initWindowMenu()
  initSim()

  mainWindow = new MicaBrowserWindow({
    width: simple ? 370 : 1000,
    height: 750,
    minHeight: simple ? 450 : 600,
    minWidth: simple ? 270 : 400,
    maxWidth: simple ? 400 : null,
    x: store.get('window-pos') ? store.get('window-pos')[0] : (width - (simple ? 350 : 1000)) / 2,
    y: store.get('window-pos') ? store.get('window-pos')[1] : (height - (simple ? 700 : 750)) / 2,
    maximizable: !simple,
    icon: path.join(__dirname, '../dist/logo.png'),
    frame: systemBar,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  })
  if (windowSizeState)
    mainWindow.setSize(windowSize.width, windowSize.height)

  remoteMain.enable(mainWindow.webContents)

  if (menuBlur || menuBlur === undefined) {
    if (IS_WINDOWS_11)
      setMicaStyle(micaStyle || 'mica', mainWindow)
    else
      mainWindow.setAcrylic()
  }
  else { mainWindow.setBackgroundColor('#fff') }

  mainWindow.loadURL(NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/index.html')}`)

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
      mainWindow.unmaximize(); else mainWindow.maximize()
  })
  ipcMain.on('window-close', (ev, isClose) => {
    if (isClose)
      app.quit(); else mainWindow.hide()
  })
  ipcMain.on('window-on-top', (event, arg) => {
    mainWindow.setAlwaysOnTop(arg)
  })
  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url)
  })

  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height))
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
  windowMenuIpc(appMenu)
  simpleIpc()

  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
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
  ipcMain.on('colorMode', (ev, color) => {
    nativeTheme.themeSource = color
    if (IS_WINDOWS_11) {
      if (color === 'system')
        mainWindow.setAutoTheme(); else if (color === 'light')
        mainWindow.setLightTheme(); else mainWindow.setDarkTheme()
    }
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
      setTimeout(timeoutFn, time, () => mainWindow.show())
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
            src: url('${filePath.replace(/\\/g, '/')}');
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
            src: url('${filePath.replace(/\\/g, '/')}');
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
}
let tray
app.setAppUserModelId('uyou ToDo')
app.whenReady().then(() => {
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
  const {
    height,
  } = screen.getPrimaryDisplay().workAreaSize
  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, height))
  Menu.setApplicationMenu(windowMenu ? appMenu : null)
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
