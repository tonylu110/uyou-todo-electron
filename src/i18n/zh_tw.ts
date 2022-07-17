import ITodoList from "../interface/ITodoListArray"

const addText = '添加'
const cancelText = '取消'
const copyText = '複製'
const copyToast = '複製成功'
const settingTitleText = '設定'
const setLangText = '跟隨系統'
const firstLoadData: ITodoList[] = [
    {
        text: '歡迎使用 uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: '將滑鼠移至左上角，完成 ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: '將滑鼠移至右上角，刪除 ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: '將滑鼠移至 ToDo 標題欄右上角，複製 ToDo 內容',
        id: new Date().getTime() + 4,
        ok: false
    }
]

export default {
    addText,
    cancelText,
    copyText,
    copyToast,
    firstLoadData,
    settingTitleText,
    setLangText
}