import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initMenuBlur() {
  if (store.get('menuBlur') === undefined)
    store.set('menuBlur', true)
  if (store.get('micaStyle') === undefined)
    store.set('micaStyle', 'mica')
}
export const menuBlur = store.get('menuBlur')
export const micaStyle = store.get('micaStyle')
export function menuBlurIpc() {
  ipcMain.on('setMenuBlur', (event, arg) => {
    store.set('menuBlur', arg)
  })
}
