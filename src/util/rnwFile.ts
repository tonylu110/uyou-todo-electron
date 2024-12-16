import { ipcRenderer } from 'electron'

interface FileOption<T> {
  name: string
  text: string
  ext: T
}

export function readFile<T>(ext: T, callback: (data: unknown) => void) {
  ipcRenderer.send('readFile', ext)
  ipcRenderer.once('readFile', (_event, data) => {
    callback(data)
  })
}

export function writeFile<T>(fileOption: FileOption<T>, callback: (data: unknown) => void) {
  ipcRenderer.send('writeFile', fileOption.name, fileOption.text, fileOption.ext)
  ipcRenderer.once('writeFile', (_event, data) => {
    callback(data)
  })
}
