const { shell, ipcMain, app } = require('electron')
const i18n = require('./i18n')
const createAboutWindow = require('./pages/about')

module.exports = function (app, mainWindow, height) {
  return [
    {
      label: 'uyou ToDo',
      submenu: [
        {
          label: i18n(app).aboutText,
          click() {
            const aboutWindow = createAboutWindow()

            ipcMain.once('close-about', () => {
              aboutWindow.close()
            })
            ipcMain.once('get-app-version', (event) => {
              event.sender.send('version', app.getVersion())
            })
          },
        },
        {
          label: i18n(app).gotoWebText,
          click() {
            shell.openExternal('http://uyoutodo.uyou.org.cn')
          },
        },
        {
          type: 'separator',
        },
        {
          label: i18n(app).quitText,
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit()
          },
        },
      ],
    },
    {
      label: i18n(app).labelWindowText,
      submenu: [
        {
          label: i18n(app).minimizeText,
          role: 'minimize',
          accelerator: 'CmdOrCtrl+S',
        },
        {
          label: i18n(app).biggestText,
          click() {
            mainWindow.maximize()
          },
          accelerator: 'CmdOrCtrl+Shift+M',
        },
        {
          label: i18n(app).smallestText,
          click() {
            mainWindow.setSize(800, 600)
          },
          accelerator: 'CmdOrCtrl+Shift+S',
        },
        {
          type: 'separator',
        },
        {
          label: i18n(app).resetWindowText,
          click() {
            mainWindow.setSize(1000, 750)
          },
          accelerator: 'CmdOrCtrl+R',
        },
      ],
    },
  ]
}
