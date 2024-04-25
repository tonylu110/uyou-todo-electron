// eslint-disable-next-line ts/no-var-requires
const { app } = require('@electron/remote')

const versionCodeArr: Array<number> = app.getVersion().split('.')

// eslint-disable-next-line unused-imports/no-unused-vars
const devCode = 131

export const versionCode = versionCodeArr[0] * 100 + versionCodeArr[1] * 10 + Number(versionCodeArr[2])
export const versionText = app.getVersion()
