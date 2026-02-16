import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vite'
import ElectronRenderer from 'vite-plugin-electron-renderer'
import vueJsxVapor from 'vue-jsx-vapor/vite'
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
    vueJsxVapor({
      macros: true,
      interop: true,
    }),
    UnoCSS(),
    VineVitePlugin({
      vueCompilerOptions: {
        __enableTransformBareAttrAsBool: false,
      },
    }),
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
        about: path.resolve(__dirname, 'electron_windows/about/index.html'),
        logoff: path.resolve(__dirname, 'electron_windows/logoff/index.html'),
        repass: path.resolve(__dirname, 'electron_windows/repass/index.html'),
        register: path.resolve(__dirname, 'electron_windows/register/index.html'),
        ai: path.resolve(__dirname, 'electron_windows/ai/index.html'),
      },
    },
  },
})
