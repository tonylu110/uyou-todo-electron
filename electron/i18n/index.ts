import zhCN from './zh_cn.js'
import en from './en.js'
import zhTW from './zh_tw.js'
import ja from './ja.js'

export default function (app: Electron.App) {
  if (app.getLocale() === 'zh-CN')
    return zhCN
  else if (app.getLocale() === 'zh-HK' || app.getLocale() === 'zh-TW')
    return zhTW
  else if (app.getLocale() === 'ja')
    return ja
  else return en
}
