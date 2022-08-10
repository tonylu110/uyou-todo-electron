import ITodoList from "../interface/ITodoListArray"

const addText = 'Agregar'
const cancelText = 'Cancelar'
const copyText = 'Copiar'
const copyToast = 'Copiado correctamente'
const settingTitleText = 'Ajustes'
const setLangText = 'Automático'
const updateText = 'Nueva versión'
const loginText = 'Sin iniciar sesión'
const myAccount = 'Mi cuenta'
const setTopState = 'Guardar Estado Superior'
const accountPage = {
  account: 'Cuenta',
  passwd: 'Clave',
  login: 'Iniciar sesión',
  register: 'Registro',
  autoSync: 'Sincronización automática',
  logout: 'Cerrar sesión',
  alertNoAnP: 'Por favor ingrese cuenta y contraseña',
  syncData: 'Datos sincrónicos',
  syncSuccess: 'Sincronización exitosa',
  syncFail: 'Sincronización fallida',
  loginError: 'error de inicio de sesion',
  alertTitle: 'Insinuación'
}

const alertText = {
    cancelText: 'Cancelar',
    returnText: 'Confirmar'
}

const listMenu = {
  cate: 'Categorías',
  allTodo: 'Todas las tareas pendientes'
}

const firstLoadData: ITodoList[] = [
  {
    text: 'Bienvenido a utilizar uyou ToDo',
    id: new Date().getTime(),
    ok: false
  },
  {
    text: 'Mueva el mouse a la izquierda del elemento ToDo para completar el ToDo',
    id: new Date().getTime() + 1,
    ok: false
  },
  {
    text: 'Mueva el mouse a la derecha del elemento ToDo para eliminar el ToDo',
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
  setLangText,
  updateText,
  alertText,
  loginText,
  myAccount,
  accountPage,
  listMenu,
  setTopState
}