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

const setWindowSizeStore = (windowSize) => {
  store.set('windowSize', windowSize)
}

const windowSize = store.get('windowSize')

const setWindowSizeSet = (windowSizeState) => {
  store.set('windowSizeState', windowSizeState)
}

const windowSizeState = store.get('windowSizeState')

module.exports = {
  initWindowSize,
  setWindowSizeStore,
  windowSize,
  setWindowSizeSet,
  windowSizeState
}