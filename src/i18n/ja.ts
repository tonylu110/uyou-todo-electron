import ITodoList from "../interface/ITodoListArray"

const addText = '追加'
const cancelText = 'キャンセル'
const copyText = 'コピー'
const copyToast = '正常にコピー'
const settingTitleText = '設定'
const setLangText = '自動'
const updateText = '新しいバージョン'
const loginText = 'ログインしていない'
const myAccount = 'マイアカウント'
const setTopState = 'トップステータスを保存'
const saveWindowSize = 'ウィンドウサイズを保存'
const clearData = 'データをクリア'
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
    returnText: '確認',
}

const listMenu = {
    cate: 'カテゴリ',
    allTodo: 'すべての ToDo',
    completed: '完了',
    incompleted: '未完成'
}

const firstLoadData: ITodoList[] = [
    {
        text: 'uyou ToDo の使用へようこそ',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: 'マウスを ToDo アイテムの左側に移動して、ToDo を完了します',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: 'ToDo アイテムの右にマウスを移動して、ToDo を削除します',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: 'ToDo タイトルバーの右上隅にマウスを移動して、ToDo コンテンツをコピーします',
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
    listMenu,
    setTopState,
    saveWindowSize,
    clearData
}