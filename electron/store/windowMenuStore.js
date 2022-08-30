const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initWindowMenu = () => {
  if (store.get('windowMenu') === undefined) {
    store.set('windowMenu', true)
  }
}

const windowMenu = store.get('windowMenu')

const windowMenuIpc = () => {
  ipcMain.on('setWindowMenu', (event, arg) => {
    store.set('windowMenu', arg)
  })
}

module.exports = {
  initWindowMenu,
  windowMenu,
  windowMenuIpc
}