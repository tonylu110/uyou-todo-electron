import os from 'node:os'

export function isMac() {
  return /Mac/.test(navigator.userAgent)
}

export function isWindow() {
  return /Windows/.test(navigator.userAgent)
}

export function isLinux() {
  return /Linux/.test(navigator.userAgent)
}

export function isWindows10OrAfter() {
  return isWindow() && Number(os.release().split('.')[2]) > 15063
}
