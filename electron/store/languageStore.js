const { ipcMain } = require('electron')
const Store = require('electron-store')
const store = new Store()

const initLang = () => {
  if (store.get('lang') === undefined) {
    store.set('lang', 'withSystem')
  }
}

const lang = store.get('lang')

const langIpc = () => {
  ipcMain.on('set-lang', (event, arg) => {
    store.set('lang', arg)
  })
}

module.exports = {
  initLang,
  lang,
  langIpc
}