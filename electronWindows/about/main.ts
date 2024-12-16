import { createApp } from 'vue'
import i18n from '../../src/i18n'
import About from './About.vine'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../src/styles/main.scss'

const app = createApp(About)

app.use(i18n)
app.mount('#app')
