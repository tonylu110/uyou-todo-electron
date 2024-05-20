import { ipcRenderer } from 'electron'
import { createToast } from '../components/Toast'

export default (storage: string, data: boolean, fn: () => void, ipc?: string, toast?: string) => {
  localStorage.setItem(storage, `${data}`)
  if (toast)
    createToast({ msg: toast })

  if (ipc)
    ipcRenderer.send(ipc, data)

  fn()
}
