import { createApp } from 'vue'
import i18n from '../../../src/i18n'
import Logoff from './Logoff'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../../src/styles/main.scss'

const app = createApp(Logoff)

app.use(i18n)
app.mount('#app')
