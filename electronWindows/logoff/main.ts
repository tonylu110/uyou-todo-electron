import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../src/main.scss'
import { createApp } from 'vue'
import i18n from '../../src/i18n'
import Logoff from './Logoff'

const app = createApp(Logoff)

app.use(i18n)
app.mount('#app')
