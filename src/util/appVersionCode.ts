const { app } = require('@electron/remote')

const versionCodeArr: Array<number> = app.getVersion().split('.')

const devCode = 131

export const versionCode = versionCodeArr[0] * 100 + versionCodeArr[1] * 10 + Number(versionCodeArr[2])
export const versionText = app.getVersion()
