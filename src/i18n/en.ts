import ITodoList from "../interface/ITodoListArray"

const addText = 'Add'
const cancelText = 'Cancel'
const copyText = 'Copy'
const copyToast = 'Copy successfully'
const settingTitleText = 'Setting'
const setLangText = 'Auto'
const firstLoadData: ITodoList[] = [
    {
        text: 'Welcome to use uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: 'Move the mouse to the upper left corner to complete the ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: 'Move the mouse to the upper right corner to delete ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: 'Move the mouse to the top right corner of the ToDo title bar to copy the ToDo content',
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