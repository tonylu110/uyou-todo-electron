import 'virtual:uno.css'
import './main.scss'
import { createApp, ref } from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import router from './router'
import AppSimple from "./AppSimple.vue";

const simpleMode = localStorage.getItem('simpleMode')

let app

if (simpleMode === 'false' || simpleMode === null) {
    app = createApp(App)
} else {
    app = createApp(AppSimple)
}

app.use(router)
app.use(PerfectScrollbar)
app.mount('#app')

const startRoute = ref(localStorage.getItem('start') ? localStorage.getItem('start')! : 'home')
if (startRoute.value === 'home')
  startRoute.value = '/'
else 
  startRoute.value = '/other?listName=today'
router.push(startRoute.value)