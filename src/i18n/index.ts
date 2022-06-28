import zhCN from "./zh_cn";
import en from "./en";
import zhTW from "./zh_tw"
import ja from "./ja";

const i18n = () => {
    var jsSrc = navigator.language.toLowerCase();
    if (jsSrc.indexOf('zh-cn') != -1) {
        return zhCN
    } else if (jsSrc == 'zh-tw' || jsSrc == 'zh-hk') {
        return zhTW
    } else if (jsSrc.indexOf('ja') != -1) {
        return ja
    } else {
        return en
    }
}

export default i18n