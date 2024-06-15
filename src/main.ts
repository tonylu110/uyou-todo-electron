import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import './styles/main.scss'
import 'floating-vue/dist/style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp, ref } from 'vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import { VTooltip } from 'floating-vue'
import { ipcRenderer } from 'electron'
import App from './App.vue'
import 'vue3-perfect-scrollbar/style.css'
import router from './router'
import AppSimple from './AppSimple.vue'
import i18n from './i18n'
import { vFocus } from './util/autofocus'

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
app.directive('tooltip', VTooltip)
app.mount('#app')

const keyToAdd = ref(localStorage.getItem('ketToAdd') === 'true')

ipcRenderer.send('setAddItemCut', keyToAdd.value)

ipcRenderer.send('initFont', localStorage.getItem('useCustomFont') === 'true', localStorage.getItem('fontSize'))
