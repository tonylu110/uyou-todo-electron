const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initMenuBlur = () => {
  if (store.get('menuBlur') === undefined) {
    store.set('menuBlur', true)
  }
}

const menuBlur = store.get('menuBlur')

const menuBlurIpc = () => {
  ipcMain.on('setMenuBlur', (event, arg) => {
    store.set('menuBlur', arg)
  })
}

module.exports = {
  initMenuBlur,
  menuBlur,
  menuBlurIpc
}