const { ipcMain } = require('electron')
const Store = require('electron-store')

const store = new Store()

function initSystemBar() {
  if (store.get('systemBar') === undefined)
    store.set('systemBar', false)
}

const systemBar = store.get('systemBar')

function systemBarIpc() {
  ipcMain.on('setSystemBar', (event, arg) => {
    store.set('systemBar', arg)
  })
}

module.exports = {
  initSystemBar,
  systemBar,
  systemBarIpc,
}
