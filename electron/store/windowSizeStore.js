import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initWindowSize() {
  if (store.get('windowSize') === undefined) {
    store.set('windowSize', {
      height: 150,
      width: 1000,
    })
  }
  if (store.get('windowSizeState') === undefined)
    store.set('windowSizeState', false)
}
export const windowSize = store.get('windowSize')
export const windowSizeState = store.get('windowSizeState')
export function windowSizeIpc() {
  ipcMain.on('getWindowSize', (event, arg) => {
    store.set('windowSize', arg)
  })
  ipcMain.on('setWindowSizeState', (event, arg) => {
    store.set('windowSizeState', arg)
  })
}
