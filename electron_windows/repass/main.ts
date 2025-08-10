import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../src/styles/main.scss'
import { createApp } from 'vue'
import i18n from '../../src/i18n'
import Repass from './Repass.vue'

const app = createApp(Repass)

app.use(i18n)
app.mount('#app')
