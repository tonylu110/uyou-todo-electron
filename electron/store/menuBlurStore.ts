import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()
export function initMenuBlur() {
  if (store.get('menuBlur') === undefined)
    store.set('menuBlur', true)
  if (store.get('micaStyle') === undefined)
    store.set('micaStyle', 'mica')
  if (store.get('liquidStyle') === undefined)
    store.set('liquidStyle', 'blur')
}
export const menuBlur = store.get('menuBlur')
export const micaStyle = store.get('micaStyle')
export const liquidStyle = store.get('liquidStyle')
export function menuBlurIpc() {
  ipcMain.on('setMenuBlur', (event, arg) => {
    store.set('menuBlur', arg)
  })
}
