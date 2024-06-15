import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '../../src/styles/main.scss'
import { createApp } from 'vue'
import About from './About'

const app = createApp(About)

app.mount('#app')
