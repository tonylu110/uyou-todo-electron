import { Menu, ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initWindowMenu() {
  if (store.get('windowMenu') === undefined)
    store.set('windowMenu', false)
}
export const windowMenu = store.get('windowMenu')
export function windowMenuIpc(appMenu) {
  ipcMain.on('setWindowMenu', (event, arg) => {
    store.set('windowMenu', arg)
    Menu.setApplicationMenu(arg ? appMenu : null)
  })
}
