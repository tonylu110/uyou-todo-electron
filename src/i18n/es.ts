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
const saveWindowSize = 'Guardar Tamaño De Ventana'
const clearData= 'Borrar Datos'
const useSystemBar = 'Usar La Barra De Título Del Sistema'
const setTopWindow = 'Ventana Superior'
const restartApp = 'Reiniciar la aplicación para que surta efecto'

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
  alertTitle: 'Insinuación',
  changPass: 'cambiar la contraseña',
  logoutMsg: '¿Estás seguro/segura de que quieres cerrar sesión?'
}

const alertText = {
    cancelText: 'Cancelar',
    returnText: 'Confirmar'
}

const listMenu = {
  cate: 'Categorías',
  allTodo: 'Todas las tareas pendientes',
  completed: 'Terminado',
  incompleted: 'Incompleto'
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

const update = {
  autoUpdate: 'Obtenga Actualizaciones Automáticamente',
  updateTitle: 'Actualización De La Aplicación',
  notUpdate: 'No hay actualización todavía',
  checkingUpdate: 'Comprobando actualizaciones...',
  checkUpdate: 'Buscar actualizaciones',
  gotoUpdate: 'Ir a actualizar',
  updateLog: 'Registro de cambios:'
}

const otherList = {
  toWeb: 'Ir al sitio web oficial',
  toPhone: 'Versión móvil',
  toDonate: 'Donar'
}

const anotherSettings = {
  menuBlur: 'Desenfoque del menú de la lista de ventanas',
  windowMenu: 'Menú Ventana',
  openSource: 'Gracias código abierto',
  about: 'Acerca de uyou ToDo',
  simple: 'Modo simple',
  enterToAdd: 'Ingrese para agregar ToDo',
  autoStart: 'Abrir con sistema',
  itemWrap: 'ToDo abierto por defecto'
}

const contextMenu = {
  copy: 'Copiar',
  paste: 'Pegar',
  comToDo: 'Tareas completas',
  removeToDo: 'Eliminar tareas pendientes',
  clearTxt: 'Borrar texto',
  closeItem: 'Cerrar artículo',
  undoTodo: 'Deshacer completado'
}

const language = 'Idioma'

const registerPage = {
  account: 'Cuenta: ',
  password: 'Contraseña: ',
  rePass: 'Repita la contraseña: ',
  reg: 'Registro',
  plzAccAndPass: 'Por favor ingrese cuenta y contraseña',
  onlyNum: 'Solo se admiten letras, números y guiones bajos',
  accLen: 'La longitud de la cuenta no puede exceder los 10 caracteres',
  rePassError: 'Repetir la contraseña no coincide con el secreto',
  regSuccess: '¡Registración exitosa!',
  regFail: '¡Registro fallido!'
}

const rePassPage = {
  oldPass: 'Contraseña anterior: ',
  newPass: 'Nueva contraseña: ',
  setPass: 'Restablecer la contraseña',
  plzInOldPass: 'Por favor ingrese la contraseña anterior',
  plzInNewPass: 'Por favor ingrese una nueva contraseña',
  setPassSuccess: '¡Éxito en el cambio de contraseña!',
  setPassFail: '¡Error al cambiar la contraseña!'
}

const logoffPage = {
  logoff: 'Desconectarse',
  success: 'Cerrar sesión con éxito',
  fail: 'Error al cerrar sesión',
  passNotTrue: 'la contraseña no es verdadera'
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
  anotherSettings,
  contextMenu,
  language,
  registerPage,
  rePassPage,
  logoffPage
}