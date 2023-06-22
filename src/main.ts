import 'virtual:uno.css'
import './main.scss'
import { createApp, ref } from 'vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import App from './App.vue'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import router from './router'
import AppSimple from './AppSimple.vue'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

const simpleMode = localStorage.getItem('simpleMode')

let app

if (simpleMode === 'false' || simpleMode === null)
  app = createApp(App)
else
  app = createApp(AppSimple)

app.use(router)
app.use(PerfectScrollbar)
app.mount('#app')

const keyToAdd = ref(localStorage.getItem('ketToAdd') === 'true')

ipcRenderer.send('setAddItemCut', keyToAdd.value)
