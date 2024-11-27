import { devtools } from '@vue/devtools'
import { ipcRenderer } from 'electron'
import { vClosePopper, vTooltip } from 'floating-vue'
import { createApp, ref } from 'vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import App from './App.vue'
import AppSimple from './AppSimple.vue'
import i18n from './i18n'
import router from './router'
import { vFocus } from './util/autofocus'
import './styles/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'floating-vue/dist/style.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import 'vue3-perfect-scrollbar/style.css'

// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV === 'development')
  devtools.connect(/* host (the default is "http://localhost"), port (the default is 8090) */)

const simpleMode = localStorage.getItem('simpleMode')

let app

const colorMode = localStorage.getItem('colorMode') ? localStorage.getItem('colorMode') : 'system'
ipcRenderer.send('colorMode', colorMode)

if (simpleMode === 'false' || simpleMode === null)
  app = createApp(App)
else
  app = createApp(AppSimple)

app.use(router)
app.use(i18n)
app.use(PerfectScrollbarPlugin)
app.directive('focus', vFocus)
app.directive('tooltip', vTooltip)
app.directive('closePopper', vClosePopper)
app.mount('#app')

const keyToAdd = ref(localStorage.getItem('ketToAdd') === 'true')

ipcRenderer.send('setAddItemCut', keyToAdd.value)

ipcRenderer.send('initFont', localStorage.getItem('useCustomFont') === 'true', localStorage.getItem('fontSize'))
