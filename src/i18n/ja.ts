import ITodoList from "../interface/ITodoListArray"

const addText = '追加'
const cancelText = 'キャンセル'
const copyText = 'コピー'
const copyToast = '正常にコピー'
const settingTitleText = '設定'
const setLangText = '自動'
const updateText = 'アップデート'
const loginText = 'ログインしていない'
const myAccount = 'マイアカウント'
const accountPage = {
    account: 'アカウント',
    passwd: 'パスワード',
    login: 'ログイン',
    register: '登録',
    autoSync: '自動同期',
    logout: 'ログアウト',
    alertNoAnP: 'アカウントとパスワードを入力してください',
    syncData: '同期データ',
    syncSuccess: '同期に成功しました',
    syncFail: '同期に失敗しました',
    loginError: 'ログインに失敗しました',
    alertTitle: 'ヒント'
}

const alertText = {
    cancelText: 'キャンセル',
    returnText: '確認'
}

const listMenu = {
    cate: 'カテゴリ',
    allTodo: 'すべての ToDo'
}

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
    setLangText,
    updateText,
    alertText,
    loginText,
    myAccount,
    accountPage,
    listMenu
}