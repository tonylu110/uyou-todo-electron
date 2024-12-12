import { ipcMain } from 'electron'
import Store from 'electron-store'

export interface WindowSize {
  height: number
  width: number
}

export type WindowSizeState = boolean

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
export const windowSize: WindowSize = store.get('windowSize') as WindowSize
export const windowSizeState: WindowSizeState = store.get('windowSizeState') as WindowSizeState
export function windowSizeIpc() {
  ipcMain.on('getWindowSize', (_event, arg) => {
    store.set('windowSize', arg)
  })
  ipcMain.on('setWindowSizeState', (_event, arg) => {
    store.set('windowSizeState', arg)
  })
}
