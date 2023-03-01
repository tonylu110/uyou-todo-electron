import ITodoList from "../interface/ITodoListArray"

const addText = '添加'
const cancelText = '取消'
const copyText = '複製'
const copyToast = '複製成功'
const settingTitleText = '設定'
const setLangText = '跟隨系統'
const updateText = '新版本'
const loginText = '未登入'
const myAccount = '我的賬號'
const setTopState = '儲存置頂狀態'
const saveWindowSize = '儲存視窗大小'
const clearData = '清除資料'
const useSystemBar = '使用系統標題欄'
const setTopWindow = '置頂視窗'
const restartApp = '重啟應用生效'

const accountPage = {
    account: '賬號',
    passwd: '密碼',
    login: '登入',
    register: '註冊',
    autoSync: '自動同步',
    logout: '退出登入',
    alertNoAnP: '請輸入賬號和密碼',
    syncData: '同步資料',
    syncSuccess: '同步成功',
    syncFail: '同步失敗',
    loginError: '登入失敗',
    alertTitle: '提示',
    changPass: '修改密碼',
    logoutMsg: '確定退出登入嗎？'
}

const alertText = {
    cancelText: '取消',
    returnText: '確認'
}

const listMenu = {
    cate: '分類',
    allTodo: '所有 ToDo',
    completed: '已完成',
    incompleted: '未完成'
}

const firstLoadData: ITodoList[] = [
    {
        text: '歡迎使用 uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: '將滑鼠移至 ToDo 項的左邊，完成 ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: '將滑鼠移至 ToDo 項的右邊，刪除 ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: '將滑鼠移至 ToDo 標題欄右上角，複製 ToDo 內容',
        id: new Date().getTime() + 4,
        ok: false
    }
]

const update = {
    autoUpdate: '自動獲取更新',
    updateTitle: '軟體更新',
    notUpdate: '暫無更新',
    checkingUpdate: '檢查更新中...',
    checkUpdate: '檢查更新',
    gotoUpdate: '前往更新',
    updateLog: '更新日誌：'
}

const otherList = {
    toWeb: '前往官網',
    toPhone: '移動版',
    toDonate: '捐贈'
}

const anotherSettings = {
    menuBlur: '頁面菜單毛玻璃',
    windowMenu: '窗口菜單',
    openSource: '開源鳴謝',
    about: '關於 uyou ToDo'
}

const contextMenu = {
    copy: '複製',
    paste: '貼上',
    comToDo: '完成 ToDo',
    removeToDo: '刪除 ToDo',
    clearTxt: '清除文字',
    closeItem: '關閉視窗'
}

const language = '語言'

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