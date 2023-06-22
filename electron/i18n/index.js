const zhCN = require('./zh_cn.js')
const en = require('./en.js')
const zhTW = require('./zh_tw.js')
const ja = require('./ja.js')

module.exports = function (app) {
  if (app.getLocale() == 'zh-CN')
    return zhCN
  else if (app.getLocale() == 'zh-HK' || app.getLocale() == 'zh-TW')
    return zhTW
  else if (app.getLocale() == 'ja')
    return ja
  else
    return en
}
