import { createPinia } from 'pinia'
import { createApp } from 'vue'
import i18n from '../../src/i18n'
import Ai from './Ai.vine'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../src/styles/main.scss'

const pinia = createPinia()

const app = createApp(Ai)

app.use(i18n)
app.use(pinia)
app.mount('#app')
