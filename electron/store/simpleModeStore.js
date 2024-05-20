import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initSim() {
  if (store.get('simple') === undefined)
    store.set('simple', false)
}
export const simple = store.get('simple')
export function simpleIpc() {
  ipcMain.on('setSimple', (event, arg) => {
    store.set('simple', arg)
  })
}
