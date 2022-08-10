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
const setTopState = '保存置頂狀態'
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
    alertTitle: '提示'
}

const alertText = {
    cancelText: '取消',
    returnText: '確認'
}

const listMenu = {
    cate: '分類',
    allTodo: '所有 ToDo'
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
    setTopState
}