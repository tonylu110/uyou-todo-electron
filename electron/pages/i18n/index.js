import zhHans from "./zhHans.js";
import zhHant from "./zhHant.js";
import ja from "./ja.js";
import en from "./en.js"
import es from "./es.js"

const i18n = (lang) => {
  let jsSrc
  const langIsSet = lang
  if (langIsSet !== undefined && langIsSet !== 'withSystem') {
    jsSrc = langIsSet
  } else {
    jsSrc = navigator.language.toLowerCase()
  }
  if (jsSrc.indexOf('zh-cn') !== -1) {
    return zhHans
  } else if (jsSrc === 'zh-tw' || jsSrc === 'zh-hk') {
    return zhHant
  } else if (jsSrc.indexOf('ja') !== -1) {
    return ja
  } else if (jsSrc.indexOf('es') !== -1) {
    return es
  } else {
    return en
  }
}

export default i18n