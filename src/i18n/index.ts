import zhCN from './zh_cn'
import en from './en'
import zhTW from './zh_tw'
import ja from './ja'
import es from './es'

function i18n() {
  let jsSrc: string
  const langIsSet = localStorage.getItem('lang')
  if (langIsSet !== null && langIsSet !== 'withSystem')
    jsSrc = langIsSet
  else
    jsSrc = navigator.language.toLowerCase()

  if (jsSrc.includes('zh-cn'))
    return zhCN
  else if (jsSrc == 'zh-tw' || jsSrc == 'zh-hk')
    return zhTW
  else if (jsSrc.includes('ja'))
    return ja
  else if (jsSrc.includes('es'))
    return es
  else
    return en
}

export default i18n
