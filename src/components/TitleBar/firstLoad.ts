function firstLoad() {
  let alwaysOnTop: boolean
  if (localStorage.getItem('alwaysOnTop') === 'true')
    alwaysOnTop = true
  else
    alwaysOnTop = false

  // eslint-disable-next-line ts/no-var-requires
  const ipcRenderer = require('electron').ipcRenderer
  if (localStorage.getItem('saveTopState') !== 'false') {
    ipcRenderer.send('window-on-top', alwaysOnTop)
    return alwaysOnTop
  }
  else {
    return false
  }
}

export default firstLoad
