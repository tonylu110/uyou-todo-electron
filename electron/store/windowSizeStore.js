const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initWindowSize = () => {
  if (store.get('windowSize') === undefined) {
    store.set('windowSize', {
      height: 150,
      width: 1000
    })
  }
  if (store.get('windowSizeState') === undefined) {
    store.set('windowSizeState', false)
  }
}

const windowSize = store.get('windowSize')

const windowSizeState = store.get('windowSizeState')

const windowSizeIpc = () => {
  ipcMain.on('getWindowSize', (event, arg) => {
    store.set('windowSize', arg)
  })
  
  ipcMain.on('setWindowSizeState', (event, arg) => {
    store.set('windowSizeState', arg)
  })
}

module.exports = {
  initWindowSize,
  windowSize,
  windowSizeState,
  windowSizeIpc
}