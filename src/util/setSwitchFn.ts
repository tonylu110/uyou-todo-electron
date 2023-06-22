import { createToast } from '../components/Toast'

export default (storage: string, data: boolean, fn: () => void, ipc?: string, toast?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const ipcRenderer = require('electron').ipcRenderer

  localStorage.setItem(storage, `${data}`)
  if (toast)
    createToast({ msg: toast })

  if (ipc)
    ipcRenderer.send(ipc, data)

  fn()
}
