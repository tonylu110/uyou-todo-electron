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

export function isWin11() {
  // eslint-disable-next-line node/prefer-global/process
  return (process.platform === 'win32' && Number(os.release().split('.')[2]) >= 22000)
}

export function isMacosTahoe() {
  // eslint-disable-next-line node/prefer-global/process
  return (process.platform === 'darwin' && Number(os.release().split('.')[0]) > 24)
}
