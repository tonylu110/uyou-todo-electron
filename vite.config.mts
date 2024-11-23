import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import ElectronRenderer from 'vite-plugin-electron-renderer'
import { VineVitePlugin } from 'vue-vine/vite'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
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
    UnoCSS(),
    VineVitePlugin(),
    ElementPlus({
      useSource: true,
    }),
    ElectronRenderer(),
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'electronWindows/about/index.html'),
        logoff: path.resolve(__dirname, 'electronWindows/logoff/index.html'),
        repass: path.resolve(__dirname, 'electronWindows/repass/index.html'),
        register: path.resolve(__dirname, 'electronWindows/register/index.html'),
      },
    },
  },
})
