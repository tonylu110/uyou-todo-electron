import emitter from "./bus"

export default (storage: string, data: boolean, fn: () => void, ipc?: string, toast?: boolean) => {
  const ipcRenderer = require('electron').ipcRenderer

  localStorage.setItem(storage, data + '')
  if (toast) {
    emitter.emit('toastShow', true)
    setTimeout(() => {
      emitter.emit('toastShow', false)
    }, 1000)
  }
  if (ipc) {
    ipcRenderer.send(ipc, data)
  }
  fn()
}