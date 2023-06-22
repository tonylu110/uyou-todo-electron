import type ITodoList from '../interface/ITodoListArray'

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
const useSystemBar = '使用系统标题栏'
const setTopWindow = '置顶窗口'
const restartApp = '重启应用生效'

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
  alertTitle: '提示',
  changPass: '修改密码',
  logoutMsg: '确定退出登录吗？',
}

const listMenu = {
  cate: '分类',
  allTodo: '所有 ToDo',
  completed: '已完成',
  incompleted: '未完成',
}

const alertText = {
  cancelText: '取消',
  returnText: '确定',
}

const firstLoadData: ITodoList[] = [
  {
    text: '欢迎使用 uyou ToDo',
    id: new Date().getTime(),
    ok: false,
  },
  {
    text: '将鼠标移至 ToDo 项的左边，完成 ToDo',
    id: new Date().getTime() + 1,
    ok: false,
  },
  {
    text: '将鼠标移至 ToDo 项的右边，删除 ToDo',
    id: new Date().getTime() + 3,
    ok: false,
  },
  {
    text: '将鼠标移至 ToDo 标题栏右上角，复制 ToDo 内容',
    id: new Date().getTime() + 4,
    ok: false,
  },
]

const update = {
  autoUpdate: '自动获取更新',
  updateTitle: '软件更新',
  notUpdate: '暂无更新',
  checkingUpdate: '检查更新中...',
  checkUpdate: '检查更新',
  gotoUpdate: '前往更新',
  updateLog: '更新日志：',
}

const otherList = {
  toWeb: '前往官网',
  toPhone: '移动版',
  toDonate: '捐赠',
}

const anotherSettings = {
  menuBlur: '页面菜单毛玻璃',
  windowMenu: '窗口菜单',
  openSource: '开源鸣谢',
  about: '关于 uyou ToDo',
  simple: '简易模式',
  enterToAdd: '回车添加 ToDo',
  autoStart: '开机自启',
  itemWrap: 'ToDo 默认展开',
}

const contextMenu = {
  copy: '复制',
  paste: '粘贴',
  comToDo: '完成 ToDo',
  removeToDo: '删除 ToDo',
  clearTxt: '清除文本',
  closeItem: '关闭窗口',
  undoTodo: '取消完成',
}

const language = '语言'

const registerPage = {
  account: '账号：',
  password: '密码：',
  rePass: '重复密码：',
  reg: '注册',
  plzAccAndPass: '请输入账号和密码',
  onlyNum: '仅支持字母、数字、下划线',
  accLen: '账号长度不能超过10位',
  rePassError: '重复密码与秘密不一致',
  regSuccess: '注册成功！',
  regFail: '注册失败！',
}

const rePassPage = {
  oldPass: '旧密码：',
  newPass: '新密码：',
  setPass: '重设密码',
  plzInOldPass: '请输入旧密码',
  plzInNewPass: '请输入新密码',
  setPassSuccess: '修改密码成功！',
  setPassFail: '修改密码失败！',
}

const logoffPage = {
  logoff: '注销账号',
  success: '注销成功',
  fail: '注销失败',
  passNotTrue: '密码不正确',
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
  logoffPage,
}
