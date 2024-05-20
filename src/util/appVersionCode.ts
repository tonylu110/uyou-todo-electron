import { app } from '@electron/remote'

const versionCodeArr: Array<string> = app.getVersion().split('.')

// eslint-disable-next-line unused-imports/no-unused-vars
const devCode = 131

export const versionCode = Number(versionCodeArr[0]) * 100 + Number(versionCodeArr[1]) * 10 + Number(versionCodeArr[2])
// export const versionCode = devCode
export const versionText = app.getVersion()
