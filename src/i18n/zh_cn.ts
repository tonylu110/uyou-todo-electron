import ITodoList from "../interface/ITodoListArray"

const addText = '添加'
const cancelText = '取消'
const copyText = '复制'
const copyToast = '复制成功'
const settingTitleText = '设置'
const setLangText = '跟随系统'
const updateText = '新版本'
const loginText = '未登录'
const myAccount = '我的账号'
const setTopState = '保存置顶状态'
const saveWindowSize = '保存窗口大小'
const clearData = '清除数据'
const accountPage = {
    account: '账号',
    passwd: '密码',
    login: '登录',
    register: '注册',
    autoSync: '自动同步',
    logout: '退出登录',
    alertNoAnP: '请输入账号和密码',
    syncData: '同步数据',
    syncSuccess: '同步成功',
    syncFail: '同步失败',
    loginError: '登录失败',
    alertTitle: '提示'
}

const listMenu = {
    cate: '分类',
    allTodo: '所有 ToDo',
    completed: '已完成',
    incompleted: '未完成'
}

const alertText = {
    cancelText: '取消',
    returnText: '确定'
}

const firstLoadData: ITodoList[] = [
    {
        text: '欢迎使用 uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: '将鼠标移至 ToDo 项的左边，完成 ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: '将鼠标移至 ToDo 项的右边，删除 ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: '将鼠标移至 ToDo 标题栏右上角，复制 ToDo 内容',
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