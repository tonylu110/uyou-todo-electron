import { ipcRenderer } from 'electron'

function firstLoad() {
  let alwaysOnTop: boolean
  if (localStorage.getItem('alwaysOnTop') === 'true')
    alwaysOnTop = true
  else
    alwaysOnTop = false

  if (localStorage.getItem('saveTopState') !== 'false') {
    ipcRenderer.send('window-on-top', alwaysOnTop)
    return alwaysOnTop
  }
  else {
    return false
  }
}

export default firstLoad
