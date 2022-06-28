import ITodoList from "../interface/ITodoListArray"

const addText = '添加'
const cancelText = '取消'
const copyText = '复制'
const copyToast = '复制成功'
const firstLoadData: ITodoList[] = [
    {
        text: '欢迎使用 uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: '将鼠标移至左上角，完成 ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: '将鼠标移至右上角，删除 ToDo',
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
    firstLoadData
}