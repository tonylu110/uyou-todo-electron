import { createPinia } from 'pinia'
import { createApp } from 'vue'
import i18n from '../../../src/i18n'
import DesktopNote from './desktopNote.vine'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../../src/styles/main.scss'

const pinia = createPinia()

const app = createApp(DesktopNote)

app.use(i18n)
app.use(pinia)
app.mount('#app')
