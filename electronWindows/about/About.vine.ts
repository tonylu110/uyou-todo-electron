import { usePreferredDark } from '@vueuse/core'
import { ipcRenderer } from 'electron'
import rolldownPackage from 'rolldown/package.json'
import vitePackage from 'vite/package.json'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import vuePackage from 'vue/package.json'
import CloseButton from '../../src/components/CloseButton/CloseButton.vine'
import { createToast } from '../../src/components/Toast'
import { versionText } from '../../src/util/appVersionCode'
import openUrlInBrowser from '../../src/util/openUrlInBrowser'
import { isMac } from '../../src/util/os'
import TitleBar from './components/TitleBar/TitleBar.vine'

function About() {
  const { t } = useI18n()

  // eslint-disable-next-line node/prefer-global/process
  const electronVersion = process.versions.electron

  const viteVersion = vitePackage.version
  const vueVersion = vuePackage.version
  const rolldownVersion = rolldownPackage.version

  const isDark = usePreferredDark()

  const showWin95Btn = ref(localStorage.getItem('win95') ? Number(localStorage.getItem('win95')) : 0)

  if (showWin95Btn.value === 6) {
    ipcRenderer.send('setTitleBar', false)
  }

  watch(showWin95Btn, (newValue) => {
    if (newValue === 6) {
      createToast({ msg: t('win95Btn.Toast') })
      localStorage.setItem('win95', `${newValue}`)
      ipcRenderer.send('setTitleBar', false)
    }
    else if (newValue === 10) {
      createToast({ msg: t('win95Btn.closeToast') })
      showWin95Btn.value = 0
      localStorage.setItem('win95', '0')
      ipcRenderer.send('setTitleBar', true)
    }
  })

  vineStyle.scoped(scss`
    .win95-button {
      background: silver;
      border: none;
      border-radius: 0;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
      box-sizing: border-box;
      color: transparent;
      min-height: 23px;
      min-width: 75px;
      padding: 0 12px;
      text-shadow: 0 0 #222;
    
      &:active {
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
      text-shadow: 1px 1px #222;
      }
    }
    
    .transparent-button {
      background: transparent;
      border: none;
      color: transparent;
    }
  `)

  return vine`
    <div
      :class="'drag justify-center items-center w-screen h-screen' + (isDark ? ' dark' : '')"
      :bg="showWin95Btn > 5 ? '#c3c7cb' : 'transparent'"
      flex="~ col"
    >
      <TitleBar :is-win-95="showWin95Btn > 5" />
      <CloseButton v-if="!isMac() && showWin95Btn < 6" window-name="about" />
      <button
        :class="showWin95Btn > 5 ? 'win95-button w-162px h-162px' : 'transparent-button w-162px h-162px'"
        p="!16px"
        m="b-4px t-10"
      >
        <img class="no-drag w-full h-full" src="../../logo.png" alt="logo" @click="showWin95Btn++" />
      </button>
      <span :c="showWin95Btn > 5 ? '' : '#555 dark:#bbb'" class="font-bold text-24px"> uyou ToDo v{{ versionText }} </span>
      <span class="block mt-10px text-14px font-bold" :c="showWin95Btn > 5 ? '' : '#555 dark:#bbb'">
        Copyright (c) 2022-{{ new Date().getFullYear() }}, Anthony Lu
      </span>
      <button
        m="t-4 b-4"
        :opacity="showWin95Btn > 5 ? '100' : '0'"
        class="win95-button no-drag"
        :disabled="showWin95Btn < 5"
        @click="openUrlInBrowser('https://95.todo.uyou.org.cn')"
      >
        {{ t('win95Btn.Button') }}
      </button>
      <div flex="~ col gap-4" items-start my-4>
        <div class="flex justify-center items-center text-12px font-bold " c="#555/50 dark:#bbb/50">
          <span :class="showWin95Btn > 5 ? 'c-black/90' : 'dark:c-#bbb'" text-end w-14 mr-1>Power By</span>
          <div flex="~ col gap-2">
            <div class="flex items-center">
              <div bg="#2c2e3a" class="rounded-full mx-2 mr-1 p-4px">
                <div class="i-logos:electron text-3 block" />
              </div>
              <span :class="showWin95Btn > 5 ? 'c-black/90' : 'dark:c-#bbb'">Electron v{{ electronVersion }} </span>
            </div>
            <div class="flex items-center">
              <div class="i-logos:vue block mx-2 mr-1" text="4.3" />
              <span :class="showWin95Btn > 5 ? 'c-black' : 'dark:c-#bbb'">Vue v{{ vueVersion }} </span>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center text-12px font-bold" c="#555/50 dark:#bbb/50">
          <span :class="showWin95Btn > 5 ? 'c-black/90' : 'dark:c-#bbb'" text-end w-14 mr-1>Build By</span>
          <div flex="~ col gap-2">
            <div class="flex items-center">
              <div class="i-logos:vitejs text-5 block mx-2 mr-1 mt--1" />
              <span :class="showWin95Btn > 5 ? 'c-black' : 'dark:c-#bbb'">Vite v{{ viteVersion }} </span>
            </div>
            <div class="flex items-center">
              <div class="i-vscode-icons:file-type-rolldown text-5 block mx-2 mr-1 mt--1" />
              <span :class="showWin95Btn > 5 ? 'c-black' : 'dark:c-#bbb'">Rolldown v{{ rolldownVersion }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

export default About
