export const isMac = () => {
  return /Mac/.test(navigator.userAgent)
}

export const isWindow = () => {
  return /Windows/.test(navigator.userAgent)
}

export const isLinux = () => {
  return /Linux/.test(navigator.userAgent)
}