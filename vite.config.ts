import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [ 
    vue(),
    UnoCSS()
  ],
  server: {
    port: 3000
  }
})
