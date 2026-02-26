import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import i18n from '../../../src/i18n'
import DesktopNote from './desktopNote.vine'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../../src/styles/main.scss'

const pinia = createPinia()

const app = createApp(DesktopNote)
const head = createHead()

app.use(i18n)
app.use(pinia)
app.use(head)
app.mount('#app')
