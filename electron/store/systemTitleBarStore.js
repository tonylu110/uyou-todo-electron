import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initSystemBar() {
  if (store.get('systemBar') === undefined)
    store.set('systemBar', false)
}
export const systemBar = store.get('systemBar')
export function systemBarIpc() {
  ipcMain.on('setSystemBar', (event, arg) => {
    store.set('systemBar', arg)
  })
}
