import { ipcRenderer } from 'electron'

function setTime(useTime: number, text: string, title: string) {
  const time: number = +useTime
  const minusTime = time - new Date().getTime()
  const timeout = Number.parseInt(`${minusTime}`)

  ipcRenderer.send('set-notification-timer', timeout, title, text)
}

export default setTime
