const { ipcMain, Menu} = require('electron')
const Store = require('electron-store')
const store = new Store()

const initWindowMenu = () => {
  if (store.get('windowMenu') === undefined) {
    store.set('windowMenu', false)
  }
}

const windowMenu = store.get('windowMenu')

const windowMenuIpc = (appMenu) => {
  ipcMain.on('setWindowMenu', (event, arg) => {
    store.set('windowMenu', arg)
    Menu.setApplicationMenu(arg ? appMenu : null);
  })
}

module.exports = {
  initWindowMenu,
  windowMenu,
  windowMenuIpc
}