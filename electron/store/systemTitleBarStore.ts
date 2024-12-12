import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initSystemBar() {
  if (store.get('systemBar') === undefined)
    store.set('systemBar', false)
}
export const systemBar = store.get('systemBar') as boolean
export function systemBarIpc() {
  ipcMain.on('setSystemBar', (_event, arg) => {
    store.set('systemBar', arg)
  })
}
