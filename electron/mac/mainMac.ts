/* eslint-disable node/prefer-global/process */
/* eslint-disable no-console */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { app, BrowserWindow, dialog, globalShortcut, ipcMain, Menu, nativeImage, nativeTheme, screen, shell, Tray } from 'electron'
import isDev from 'electron-is-dev'
import liquidGlass from 'electron-liquid-glass'
import Store from 'electron-store'
import i18n from '../i18n/index.ts'
import { readFile, writeFile } from '../pages/util/rnwFile.ts'
import sendNotification from '../pages/util/sendNotification.ts'
import { initMenuBlur, liquidStyle, menuBlur, menuBlurIpc } from '../store/menuBlurStore.ts'
import { initSim, simple, simpleIpc } from '../store/simpleModeStore.ts'
import { initSystemBar, systemBar, systemBarIpc } from '../store/systemTitleBarStore.ts'
import { initWindowMenu, windowMenu, windowMenuIpc } from '../store/windowMenuStore.ts'
import { initWindowSize, windowSize, windowSizeIpc, windowSizeState } from '../store/windowSizeStore.ts'
import useFontSize from '../useFontSize.ts'
import menuTemplate from './menu.ts'
import createAboutWindowMac from './pages/aboutMac.ts'
import createLogoffWindowMac from './pages/logoffMac.ts'
import createRegisterWindowMac from './pages/registerMac.ts'
import createRepassWindowMac from './pages/repassMac.ts'

const store = new Store()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
    maxWidth: simple ? 400 : undefined,
    maximizable: !simple,
    x: (store.get('window-pos')
      ? (store.get('window-pos') as Array<number>)[0]
      : (width - (simple ? 350 : 1000)) / 2),
    y: (store.get('window-pos')
      ? (store.get('window-pos') as Array<number>)[1]
      : (height - (simple ? 700 : 750)) / 2),
    vibrancy: (menuBlur || menuBlur === undefined) && !liquidStyle.includes('liquid') ? 'menu' : undefined,
    transparent: liquidStyle.includes('liquid') && (menuBlur || menuBlur === undefined)!,
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
      preload: '../preload.js',
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      defaultFontFamily: {
        standard: 'Helvetica',
        serif: 'Times',
        sansSerif: 'Helvetica',
        monospace: 'Menlo',
      },
    },
  })

  if (Number(os.release().split('.')[0]) > 24 && liquidStyle.includes('liquid') && (menuBlur || menuBlur === undefined)) {
    mainWindow.setWindowButtonVisibility(true)
  }

  if (windowSizeState)
    mainWindow.setSize(windowSize.width, windowSize.height)
  remoteMain.enable(mainWindow.webContents)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)

  // mainWindow.setMaximizable(false)

  if (isDev) {
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
      BrowserWindow.fromId(registerId)!.close()
    })
  })
  ipcMain.on('open-repass', (ev, uname) => {
    const repassWindow = createRepassWindowMac(uname)
    const repassId = repassWindow.id
    ipcMain.once('close-repass', () => {
      BrowserWindow.fromId(repassId)!.close()
    })
  })
  ipcMain.on('open-logoff', (ev, uname) => {
    const logoffWindow = createLogoffWindowMac(uname)
    const logoffId = logoffWindow.id
    ipcMain.once('close-logoff', () => {
      BrowserWindow.fromId(logoffId)!.close()
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
    mainWindow.webContents.insertCSS(useFontSize(size, false))
  })
  ipcMain.on('writeFile', (ev, name, text, ext) => {
    const file = writeFile(name, text, ext)
    ev.reply('writeFile', file)
  })
  ipcMain.on('readFile', (ev, ext) => {
    const fileText = readFile(ext)
    ev.reply('readFile', fileText)
  })

  ipcMain.on('setLiquid', (_ev, liquid) => {
    store.set('liquidStyle', liquid)
  })
}
let tray
app.whenReady().then(() => {
  if (process.platform === 'win32')
    app.setAppUserModelId('uyou ToDo')
  createWindow()
  if (Number(os.release().split('.')[0]) > 24 && liquidStyle.includes('liquid') && (menuBlur || menuBlur === undefined)) {
    mainWindow.webContents.once('did-finish-load', () => {
      const glassId = liquidGlass.addView(mainWindow.getNativeWindowHandle(), {})

      if (liquidStyle === 'liquid')
        liquidGlass.unstable_setVariant(glassId, 2)
      else if (liquidStyle === 'liquidBlur')
        liquidGlass.unstable_setVariant(glassId, 10)
    })
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.send('isDev', isDev)
  })
  if (process.platform === 'darwin') {
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '../../dist/tray/logoTemplate.png')))
  }
  else {
    tray = new Tray(path.join(__dirname, '../../dist/logo.png'))
  }
  const contextMenu = Menu.buildFromTemplate([{
    label: i18n(app).open,
    click: () => mainWindow.show(),
  }, {
    label: i18n(app).quit,
    click: () => app.quit(),
  }])
  tray.setToolTip('uyou ToDo')
  tray.setContextMenu(contextMenu)
  const appMenu = Menu.buildFromTemplate(menuTemplate(app, mainWindow))
  Menu.setApplicationMenu(null)

  if (process.platform === 'darwin')
    Menu.setApplicationMenu(appMenu)
  else if (windowMenu)
    Menu.setApplicationMenu(appMenu)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })

  if (isDev) {
    import('@tomjs/electron-devtools-installer')
      .then((devTools) => {
        devTools.installExtension(devTools.VUEJS_DEVTOOLS_BETA)
          .then(ext => console.log(`Added Extension:  ${ext.name}`))
          .catch(err => console.log('An error occurred: ', err))
      })
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})
