import { createI18n } from 'vue-i18n'
import zhCN from './zh-cn.json'
import en from './en.json'
import zhTW from './zh-tw.json'
import es from './es.json'
import ja from './ja.json'

const messages = {
  'en-us': en,
  'es': es,
  'zh-cn': zhCN,
  'zh-tw': zhTW,
  'ja': ja,
}

const localLang = localStorage.getItem('lang')
const isAuto = localLang === 'withSystem' || localLang === null

const i18n = createI18n({
  legacy: false,
  locale: isAuto ? navigator.language.toLowerCase() : localLang,
  fallbackLocale: 'en-us',
  messages,
})

export default i18n
