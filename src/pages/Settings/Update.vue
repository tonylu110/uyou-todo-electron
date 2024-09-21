<script setup lang="ts">
import { app } from '@electron/remote'
import { ipcRenderer } from 'electron'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Ref } from 'vue'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import { createToast } from '../../components/Toast'
import router from '../../router'
import { versionCode } from '../../util/appVersionCode'
import emitter from '../../util/bus'

const { t, locale } = useI18n()

const version = versionCode

const updateMsg: Ref<string[]> = ref([])
const newVersion = ref('')
const updateButton = ref(t('update.checkingUpdate'))
function getUpdate() {
  setTimeout(() => {
    fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
      return res.json()
    }).then((res) => {
      if (res[1].code > version) {
        newVersion.value = `${t('updateText')}: v${res[1].version}`
        if (locale.value === 'zh-cn')
          updateMsg.value = res[1].data
        else
          updateMsg.value = res[1].enData
        updateButton.value = t('update.gotoUpdate')
      }
      else {
        newVersion.value = t('update.notUpdate')
        updateButton.value = t('update.checkUpdate')
        createToast({ msg: newVersion.value })
      }
    })
  }, Math.floor(Math.random () * 900) + 100)
}

function updateButtonCilck() {
  if (updateMsg.value.length === 0) {
    updateButton.value = t('update.checkingUpdate')
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

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('update.updateTitle')" />
  <TabBar
    v-else
    :title="t('update.updateTitle')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList justify="between" :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <div
      flex items-center justify-center
      :w="simpleMode ? '100%' : ''"
    >
      <ItemSpace
        items-center justify-center
        :w="simpleMode ? '' : (menuShort ? '[calc(100vw-108px)]' : '[calc(100vw-400px)]')"
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
          c="#00000050 dark:#bbb"
          font-bold
        >
          uyou ToDo v{{ app.getVersion() }}
        </span>
        <span
          v-if="newVersion !== ''"
          c="#00000050 dark:#bbb"

          mb-15px mt-5px text-14px font-bold
        >
          {{ newVersion }}
        </span>
        <div
          v-if="updateMsg.length > 0"
          :w="simpleMode ? '[calc(100%-10px)]' : '[calc(100vw-470px)]'" h-auto
          max-w-530px flex="~ col"
          justify-center
          border-t="1px solid #00000020 dark:#999/20"
          p="y-5px x-15px"
        >
          <span
            c="black dark:#bbb"
            mt-10px text-16px font-bold
          >
            {{ t('update.updateLog') }}
          </span>
          <ul w="100%" pl-20px>
            <li
              v-for="(item, index) in updateMsg" :key="index" text-15px
              c="#00000090 dark:#bbb"
              font-bold
              mb="10px"
            >
              {{ item.slice(2) }}
            </li>
          </ul>
        </div>
      </ItemSpace>
    </div>
    <ItemButton mode="primary" @click="updateButtonCilck">
      {{ updateButton }}
    </ItemButton>
  </SettingList>
</template>
