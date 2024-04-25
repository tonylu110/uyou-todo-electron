// eslint-disable-next-line ts/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

function setTime(useTime: number, text: string, title: string) {
  const time: number = +useTime
  const minusTime = time - new Date().getTime()
  const timeout = Number.parseInt(`${minusTime}`)

  ipcRenderer.send('set-notification-timer', timeout, title, text)
}

export default setTime
