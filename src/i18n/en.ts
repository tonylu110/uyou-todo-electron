import ITodoList from "../interface/ITodoListArray"

const addText = 'Add'
const cancelText = 'Cancel'
const copyText = 'Copy'
const copyToast = 'Copy successfully'
const settingTitleText = 'Setting'
const setLangText = 'Auto'
const updateText = 'New Version'
const loginText = 'Not logged in'
const myAccount = 'My Account'
const setTopState = 'Save Top Status'
const saveWindowSize = 'Save Window Size'
const clearData = 'Clear Data'
const useSystemBar = 'Use The System Title Bar'
const setTopWindow = 'Top Window'
const restartApp = 'Restart the app to take effect'

const accountPage = {
    account: 'Account',
    passwd: 'Password',
    login: 'Log in',
    register: 'Register',
    autoSync: 'Automatic sync',
    logout: 'Log out',
    alertNoAnP: 'Please enter account and password',
    syncData: 'Synchronous Data',
    syncSuccess: 'Sync succeeded',
    syncFail: 'Sync failed',
    loginError: 'Login failed',
    alertTitle: 'Hint'
}

const alertText = {
    cancelText: 'Cancel',
    returnText: 'Confirm'
}

const listMenu = {
    cate: 'Categories',
    allTodo: 'All ToDos',
    completed: 'Completed',
    incompleted: 'Incompleted'
}

const update = {
    autoUpdate: 'Get Updates Automatically',
    updateTitle: 'App Update',
    notUpdate: 'No update yet',
    checkingUpdate: 'Checking for updates...',
    checkUpdate: 'Check for updates',
    gotoUpdate: 'Go to update',
    updateLog: 'Changelog:'
}

const firstLoadData: ITodoList[] = [
    {
        text: 'Welcome to use uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: 'Move the mouse to the left of the ToDo item to complete the ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: 'Move the mouse to the right of the ToDo item to delete the ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: 'Move the mouse to the top right corner of the ToDo title bar to copy the ToDo content',
        id: new Date().getTime() + 4,
        ok: false
    }
]

const otherList = {
    toWeb: 'Go to the official website',
    toPhone: 'Mobile version',
    toDonate: 'Donate'
}

const anotherSettings = {
    menuBlur: 'Window List Menu Blur',
    windowMenu: 'Window Menu',
    openSource: 'Thanks Open Source',
    about: 'About uyou ToDo'
}

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
    anotherSettings
}