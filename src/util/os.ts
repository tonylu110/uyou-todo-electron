// eslint-disable-next-line ts/no-var-requires
const os = require('node:os')

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
  return isWindow() && os.release().split('.')[2] > 15063
}
