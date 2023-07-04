<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import i18n from '../../i18n'
import router from '../../router'
import SettingList from '../../components/SettingList'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import { versionCode } from '../../util/appVersionCode'
import { createToast } from '../../components/Toast'
import emitter from '../../util/bus'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { app } = require('@electron/remote')
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron')

const version = versionCode

const updateMsg: Ref<string[]> = ref([])
const newVersion = ref('')
const updateButton = ref(i18n().update.checkingUpdate)
function getUpdate() {
  setTimeout(() => {
    fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
      return res.json()
    }).then((res) => {
      if (res[1].code > version) {
        newVersion.value = `${i18n().updateText}: v${res[1].version}`
        updateMsg.value = res[1].data
        updateButton.value = i18n().update.gotoUpdate
      }
      else {
        newVersion.value = i18n().update.notUpdate
        updateButton.value = i18n().update.checkUpdate
        createToast({ msg: newVersion.value })
      }
    })
  }, Math.floor(Math.random () * 900) + 100)
}

function updateButtonCilck() {
  if (updateMsg.value.length === 0) {
    updateButton.value = i18n().update.checkingUpdate
    newVersion.value = ''
    getUpdate()
  }
  else {
    ipcRenderer.send('open-url', 'https://github.com/tonylu110/uyou-todo-electron/releases')
  }
}

const isInDev = localStorage.getItem('isInDev') === 'true'
const clickNum = ref(0)
function toDevMode() {
  clickNum.value++
  if ((clickNum.value > 4) || isInDev) {
    newVersion.value = 'opened dev!!!'
    localStorage.setItem('isInDev', 'true')
    createToast({ msg: newVersion.value })
  }
}

onMounted(() => {
  getUpdate()
})

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})
</script>

<template>
  <TabBar
    :title="i18n().update.updateTitle"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList justify="between">
    <div
      flex justify-center items-center
      :w="simpleMode ? '100%' : ''"
    >
      <div
        :w="simpleMode ? '[calc(100%-40px)]' : (menuShort ? '[calc(100vw-98px)]' : '[calc(100vw-400px)]')" max-w-560px h-auto
        flex="~ col" justify-center items-center
        bg-white
        rounded-7px
        mb-10px
        p="x-10px y-0"
        shadow-item
      >
        <img
          h-100px
          m="x-0 y-15px"
          src="/images/logo.png"
          alt=""
          @click="toDevMode"
        >
        <span
          :mb="newVersion ? '' : '15px'"
          c="#00000050"
          font-bold
        >
          uyou ToDo v{{ app.getVersion() }}
        </span>
        <span
          v-if="newVersion !== ''"
          c="#00000050" mt-5px text-14px
          mb-15px
          font-bold
        >
          {{ newVersion }}
        </span>
        <div
          v-if="updateMsg.length > 0"
          :w="simpleMode ? '[calc(100%-10px)]' : '[calc(100vw-470px)]'" h-auto
          max-w-530px flex="~ col"
          justify-center
          border-t="1px solid #00000020"
          p="y-5px x-15px"
        >
          <span
            c-black text-16px font-bold
            mt-10px
          >
            {{ i18n().update.updateLog }}
          </span>
          <ul w="100%" pl-20px>
            <li
              v-for="(item, index) in updateMsg" :key="index" text-15px
              c="#00000090"
              font-bold
              mb="10px"
            >
              {{ item.slice(2) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ItemButton mode="primary" @click="updateButtonCilck">
      {{ updateButton }}
    </ItemButton>
  </SettingList>
</template>
