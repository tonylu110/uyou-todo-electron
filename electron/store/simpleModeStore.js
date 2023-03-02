const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initSim = () => {
  if (store.get('simple') === undefined) {
    store.set('simple', false)
  }
}

const simple = store.get('simple')

const simpleIpc = () => {
  ipcMain.on('setSimple', (event, arg) => {
    store.set('simple', arg)
  })
}

module.exports = {
  initSim,
  simple,
  simpleIpc
}