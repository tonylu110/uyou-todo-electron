<template>
  <TabBar 
    :title="i18n().update.updateTitle"
    :rightImgShow="false"
    :leftImgShow="true"
    @leftClick="router.back()"
    bg-color="light"
  />
  <SettingList justify="space-between">
    <div 
      flex justify-center items-center
      :w="simpleMode ? '100%' : ''"
    >
      <div 
        :w="simpleMode ? '[calc(100%-40px)]' : '[calc(100vw-400px)]'" max-w-560px h-auto
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
        />
        <span 
          :mb="newVersion ? '' : '15px'"
          c="#00000050"
          font-bold
        >
          uyou ToDo v{{ app.getVersion() }}
        </span>
        <span 
          c="#00000050"
          mt-5px text-14px mb-15px
          font-bold
          v-if="newVersion !== ''"
        >
          {{ newVersion }}
        </span>
        <div  
          :w="simpleMode ? '[calc(100%-10px)]' : '[calc(100vw-470px)]'"
          h-auto max-w-530px
          flex="~ col" justify-center
          border-t="1px solid #00000020"
          p="y-5px x-15px"
          v-if="updateMsg.length > 0" 
        >
          <span 
            c-black text-16px font-bold
            mt-10px
          > 
            {{ i18n().update.updateLog }}
          </span>
          <ul w="100%" pl-20px>
            <li
              text-15px c="#00000090" font-bold
              mb="10px"
              v-for="(item, index) in updateMsg" 
              :key="index"
            >
              {{ item.slice(2) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ItemButton mode="primary" @click="updateButtonCilck">{{ updateButton }}</ItemButton>
    <Toast :msg="newVersion" v-if="toastShow" />
  </SettingList>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import TabBar from '../../components/TabBar/TabBar.vue';
import i18n from '../../i18n';
import router from '../../router';
import SettingList from "../../components/SettingList/SettingList.vue";
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue';
import appVersionCode from '../../util/appVersionCode';
import Toast from '../../components/Toast/Toast.vue';

const { app } = require('@electron/remote')
const { ipcRenderer } = require('electron')

const version = appVersionCode

const updateMsg: Ref<string[]> = ref([])
const newVersion = ref('')
const updateButton = ref(i18n().update.checkingUpdate)
const toastShow = ref(false)
const getUpdate = () => {
  setTimeout(() => {
    fetch('https://api.todo.uyou.org.cn/update/get').then(res => {
      return res.json()
    }).then(res => {
      if (res[1].code > version) {
        newVersion.value = `${i18n().updateText}: v${res[1].version}`
        updateMsg.value = res[1].data
        updateButton.value = i18n().update.gotoUpdate
      } else {
        newVersion.value = i18n().update.notUpdate
        updateButton.value = i18n().update.checkUpdate
        toastShow.value = true
        setTimeout(() => {
          toastShow.value = false
        }, 700);
      }
    })
  }, Math.floor(Math.random () * 900) + 100);
}

const updateButtonCilck = () => {
  if (updateMsg.value.length === 0) {
    updateButton.value = i18n().update.checkingUpdate
    newVersion.value = ''
    getUpdate()
  } else {
    ipcRenderer.send('open-url', 'https://github.com/tonylu110/uyou-todo-electron/releases')
  }
}

onMounted(() => {
  getUpdate()
})

const simpleMode = localStorage.getItem('simpleMode') === 'true'
</script>