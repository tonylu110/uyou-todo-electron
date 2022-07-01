const { shell } = require('electron');
const i18n = require('./i18n');

module.exports = function (app, mainWindow, height) {
  return [
    {
      label: 'uyou Todo',
      submenu: [
        {
          label: i18n(app).aboutText,
          role: 'about'
        },
        {
          label: i18n(app).gotoWebText,
          click() {
            shell.openExternal('http://uyoutodo.uyou.org.cn');
          }
        },
        {
          type: 'separator'
        },
        {
          label: i18n(app).quitText,
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit()
          }
        }
      ]
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
            mainWindow.setSize(600, height - 100)
          },
          accelerator: 'CmdOrCtrl+Shift+M',
        },
        {
          label: i18n(app).smallestText,
          click() {
            mainWindow.setSize(300, 600)
          },
          accelerator: 'CmdOrCtrl+Shift+S',
        },
        {
          type: 'separator'
        },
        {
          label: i18n(app).resetWindowText,
          click() {
            mainWindow.setSize(320, 640)
          },
          accelerator: 'CmdOrCtrl+R'
        }
      ]
    }
  ];
}