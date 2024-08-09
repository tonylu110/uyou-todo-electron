import { shell } from 'electron'

export default function (url: string) {
  shell.openExternal(url)
}
