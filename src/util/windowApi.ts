// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

function closeWindow(window?: string) {
  if (window)
    ipcRenderer.send(`close-${window}`)
  else
    ipcRenderer.send('window-close')
}

function minWindow() {
  ipcRenderer.send('window-min')
}

function maxWindow() {
  ipcRenderer.send('window-max')
}

function topWindow(topState: boolean) {
  ipcRenderer.send('window-on-top', topState)
}

export { closeWindow, maxWindow, minWindow, topWindow }
