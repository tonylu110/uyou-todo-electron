import zhCN from "./zh_cn";
import en from "./en";
import zhTW from "./zh_tw"
import ja from "./ja";
import es from "./es";

const i18n = () => {
    let jsSrc: string
    const langIsSet = localStorage.getItem('lang')
    if (langIsSet !== null && langIsSet !== 'withSystem') {
        jsSrc = langIsSet
    } else {
        jsSrc = navigator.language.toLowerCase()
    }
    if (jsSrc.indexOf('zh-cn') != -1) {
        return zhCN
    } else if (jsSrc == 'zh-tw' || jsSrc == 'zh-hk') {
        return zhTW
    } else if (jsSrc.indexOf('ja') != -1) {
        return ja
    } else if (jsSrc.indexOf('es') != -1) {
        return es
    } else {
        return en
    }
}

export default i18n