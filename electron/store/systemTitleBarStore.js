const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initSystemBar = () => {
  if (store.get('systemBar') === undefined) {
    store.set('systemBar', false)
  }
}

const systemBar = store.get('systemBar')

const systemBarIpc = () => {
  ipcMain.on('setSystemBar', (event, arg) => {
    store.set('systemBar', arg)
  })
}

module.exports = {
  initSystemBar,
  systemBar,
  systemBarIpc
}