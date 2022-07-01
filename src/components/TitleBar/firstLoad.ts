const firstLoad = () => {
  let alwaysOnTop: boolean
  if (localStorage.getItem('alwaysOnTop') === 'true') {
    alwaysOnTop = true
  } else {
    alwaysOnTop = false
  }
  const ipcRenderer = require('electron').ipcRenderer
  ipcRenderer.send('window-on-top', alwaysOnTop)
  return alwaysOnTop
}

export default firstLoad