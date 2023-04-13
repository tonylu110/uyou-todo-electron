const os = require('os')

export const isMac = () => {
    return /Mac/.test(navigator.userAgent)
}

export const isWindow = () => {
    return /Windows/.test(navigator.userAgent)
}

export const isLinux = () => {
    return /Linux/.test(navigator.userAgent)
}

export const isWindows10OrAfter = () => {
    return isWindow() && os.release().split('.')[2] > 15063
}