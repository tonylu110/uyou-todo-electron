import ITodoList from "../interface/ITodoListArray"

const addText = '追加'
const cancelText = 'キャンセル'
const copyText = 'コピー'
const copyToast = '正常にコピー'
const settingTitleText = '設定'
const setLangText = '自動'
const firstLoadData: ITodoList[] = [
    {
        text: 'uyou ToDoの使用へようこそ',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: 'マウスを左上隅に移動して、ToDoを完了します',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: 'ToDoを削除するには、マウスを右上隅に移動します',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: 'ToDoタイトルバーの右上隅にマウスを移動して、ToDoコンテンツをコピーします',
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