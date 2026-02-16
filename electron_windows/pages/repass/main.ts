import { createApp } from 'vue'
import i18n from '../../../src/i18n'
import Repass from './Repass.vue'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../../src/styles/main.scss'

const app = createApp(Repass)

app.use(i18n)
app.mount('#app')
