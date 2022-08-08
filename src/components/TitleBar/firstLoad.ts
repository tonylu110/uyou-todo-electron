const firstLoad = () => {
  let alwaysOnTop: boolean
  if (localStorage.getItem('alwaysOnTop') === 'true') {
    alwaysOnTop = true
  } else {
    alwaysOnTop = false
  }
  const ipcRenderer = require('electron').ipcRenderer
  if (localStorage.getItem('saveTopState') !== 'false') {
    ipcRenderer.send('window-on-top', alwaysOnTop)
    return alwaysOnTop
  } else {
    return false
  }
}

export default firstLoad