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
const useSystemBar = 'システム タイトル バーを使用'
const setTopWindow = 'トップ ウィンドウ'
const restartApp = 'アプリを再起動して有効にする'

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
    alertTitle: 'ヒント',
    changPass: 'パスワードを変更する',
    logoutMsg: 'ログアウトしてもよろしいですか？'
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

const update = {
    autoUpdate: 'アップデートを自動的に取得する',
    updateTitle: 'アプリのアップデート',
    notUpdate: '更新はまだありません',
    checkingUpdate: 'アップデートの確認...',
    checkUpdate: 'アップデートを確認',
    gotoUpdate: '更新する',
    updateLog: '変更ログ：'
}

const otherList = {
    toWeb: '公式サイトへ行く',
    toPhone: 'モバイル版',
    toDonate: '寄付する'
}

const anotherSettings = {
    menuBlur: 'ウィンドウ リスト メニューのぼかし',
    windowMenu: 'ウィンドウメニュー',
    openSource: 'ありがとうオープンソース',
    about: 'uyou ToDo について',
    simple: 'シンプルモード'
}

const contextMenu = {
    copy: 'コピー',
    paste: 'ペースト',
    comToDo: 'ToDo を完了する',
    removeToDo: 'ToDo を削除',
    clearTxt: 'クリアテキスト',
    closeItem: 'アイテムを閉じる',
    undoTodo: '取り消し完了'
}

const language = '言語'

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
    clearData,
    update,
    useSystemBar,
    setTopWindow,
    restartApp,
    otherList,
    anotherSettings,
    contextMenu,
    language
}