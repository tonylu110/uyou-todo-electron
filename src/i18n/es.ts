import ITodoList from "../interface/ITodoListArray"

const addText = 'Agregar'
const cancelText = 'Cancelar'
const copyText = 'Copiar'
const copyToast = 'Copiado correctamente'
const settingTitleText = 'Ajustes'
const setLangText = 'Automático'
const firstLoadData: ITodoList[] = [
  {
    text: 'Bienvenido a utilizar uyou ToDo',
    id: new Date().getTime(),
    ok: false
  },
  {
    text: 'Mueva el ratón a la esquina superior izquierda para completar el ToDo',
    id: new Date().getTime() + 1,
    ok: false
  },
  {
    text: 'Mueva el ratón a la esquina superior derecha para borrar ToDo',
    id: new Date().getTime() + 3,
    ok: false
  },
  {
    text: 'Mueva el ratón a la esquina superior derecha de la barra de título de ToDo para copiar el contenido de ToDo',
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