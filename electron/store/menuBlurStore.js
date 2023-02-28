const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initMenuBlur = () => {
  if (store.get('menuBlur') === undefined) {
    store.set('menuBlur', true)
  }
  if (store.get('micaStyle') === undefined) {
    store.set('micaStyle', 'mica')
  }
}

const menuBlur = store.get('menuBlur')
const micaStyle = store.get('micaStyle')

const menuBlurIpc = () => {
  ipcMain.on('setMenuBlur', (event, arg) => {
    store.set('menuBlur', arg)
  })
}

module.exports = {
  initMenuBlur,
  menuBlur,
  menuBlurIpc,
  micaStyle
}