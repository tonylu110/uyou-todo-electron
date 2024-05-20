import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'unplugin-vue-macros/vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  base: './',
  plugins: [
    VueMacros({
      plugins: {
        vue: vue({
          script: {
            defineModel: true,
          },
        }),
        vueJsx: vueJsx(),
      },
    }),
    VueDevTools(),
    UnoCSS(),
    ElementPlus({}),
  ],
  server: {
    port: 3000,
  },
})
