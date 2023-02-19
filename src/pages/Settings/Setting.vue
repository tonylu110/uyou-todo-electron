<template>
  <TabBar 
    :title="i18n().settingTitleText"
    :rightImgShow="false"
    :leftImgShow="false"
  />
  <SettingList>
    <Item
        :title="loginState ? i18n().myAccount : i18n().loginText"
        @itemFun="() => router.push('/account?from=setting')"
    />
    <ItemBox>
      <Item
          :title="i18n().update.autoUpdate"
          :showSwitch="true"
          :switchState="autoUpdateState"
          @switchFun="setAutoUpdate"
      />
      <Item
          :title="i18n().update.updateTitle"
          @itemFun="router.push('/update?from=setting')"
      />
    </ItemBox>
    <ItemBox>
      <Item
          :title="i18n().useSystemBar"
          :showSwitch="true"
          :switchState="useSystemTitleBar"
          @switchFun="setTitleBar"
      />
      <Item
          v-if="isLinux"
          title="页面菜单毛玻璃"
          :showSwitch="true"
          :switchState="menuBlurState"
          @switchFun="setMenuBlur"
      />
      <Item
          v-if="titleBarShow && isMac"
          title="窗口菜单"
          :showSwitch="true"
          :switchState="showWindowMenuState"
          @switchFun="setWindowMenu"
      />
    </ItemBox>
    <ItemBox>
      <Item
          :title="i18n().setTopState"
          :showSwitch="true"
          :switchState="saveTopState"
          @switchFun="setTopState"
      />
      <Item
          v-if="titleBarShow"
          :title="i18n().setTopWindow"
          :showSwitch="true"
          :switchState="topState"
          @switchFun="onTopWindow"
      />
      <Item
          :title="i18n().saveWindowSize"
          :showSwitch="true"
          :switchState="saveWindowSizeState"
          @switchFun="setWindowSizeState"
      />
    </ItemBox>
    <ItemBox>
      <Item :title="i18n().otherList.toWeb" itemImg="./images/web.png" @itemFun="shell.openExternal('https://uyoutodo.uyou.org.cn/#/')"/>
      <Item :title="i18n().otherList.toPhone" itemImg="./images/phone.png" @itemFun="shell.openExternal('https://github.com/tonylu110/uyou-todo-uni/releases')"/>
      <Item :title="i18n().otherList.toDonate" itemImg="./images/donate.png" @itemFun="router.push('/donate?from=setting')"/>
    </ItemBox>
    <ItemBox>
      <Item title="开源鸣谢" @itemFun="router.push('/open')"/>
      <Item title="关于 uyou ToDo" @itemFun="openAboutWindow"/>
    </ItemBox>
    <ItemButton mode="error" @click="clearData">{{ i18n().clearData }}</ItemButton>
    <ItemButton @click="() => langMenuShow = !langMenuShow">
      <img src="/images/lang.png" alt="" class="lang-img" />
    </ItemButton>
    <LangSet v-if="langMenuShow" />
    <Toast :msg="i18n().restartApp" v-if="toastShow" />
    <div class="black-back"  v-if="langMenuShow" @click="() => langMenuShow = !langMenuShow"></div>
  </SettingList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingList from '../../components/SettingList/SettingList.vue';
import i18n from '../../i18n';
import LangSet from '../../components/SettingList/LangSet/LangSet.vue';
import Item from '../../components/ItemBox/Item/Item.vue';
import ItemBox from '../../components/ItemBox/ItemBox.vue';
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue';
import router from '../../router';
import Toast from '../../components/Toast/Toast.vue';
import firstLoad from "../../components/TitleBar/firstLoad";

const ipcRenderer = require('electron').ipcRenderer

const { app } = require('@electron/remote')
const { shell } = require('electron')

const isLinux = !(process.platform === 'linux')
const isMac = !(process.platform === 'darwin')

const toastShow = ref(false)
const titleBarShow = localStorage.getItem('systemTitle') === 'true'

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const langMenuShow = ref(false)

const saveTopState = ref(localStorage.getItem('saveTopState') === 'true' || localStorage.getItem('saveTopState') === null)
const setTopState = () => {
  saveTopState.value = !saveTopState.value
  localStorage.setItem('saveTopState', saveTopState.value + '')
}

const saveWindowSizeState = ref(localStorage.getItem('saveWindowSizeState') === 'true')
const setWindowSizeState = () => {
  saveWindowSizeState.value = !saveWindowSizeState.value
  localStorage.setItem('saveWindowSizeState', saveWindowSizeState.value + '')
  ipcRenderer.send('setWindowSizeState', saveWindowSizeState.value)
}

const autoUpdateState = ref(localStorage.getItem('autoUpdate') !== 'false')
const setAutoUpdate = () => {
  autoUpdateState.value = !autoUpdateState.value
  localStorage.setItem('autoUpdate', autoUpdateState.value + '')
}

const useSystemTitleBar = ref(localStorage.getItem('systemTitle') === 'true')
const setTitleBar = () => {
  useSystemTitleBar.value = !useSystemTitleBar.value
  localStorage.setItem('systemTitle', useSystemTitleBar.value + '')
  ipcRenderer.send('setSystemBar', useSystemTitleBar.value)
  toastShow.value = true
  setTimeout(() => {
    toastShow.value = false
  }, 700);
}

const topState = ref(firstLoad())
const onTopWindow = () => {
  topState.value = !topState.value
  ipcRenderer.send('window-on-top', topState.value)
  localStorage.setItem('alwaysOnTop', topState.value + '')
}

const clearData = () => {
  localStorage.clear()
  window.location.reload()
}

const menuBlurState = ref(localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null)
const setMenuBlur = () => {
  menuBlurState.value = !menuBlurState.value
  ipcRenderer.send('setMenuBlur', menuBlurState.value)
  localStorage.setItem('menuBlur', menuBlurState.value + '')
  toastShow.value = true
  setTimeout(() => {
    toastShow.value = false
  }, 700);
}

const showWindowMenuState = ref(localStorage.getItem('windowMenu') === 'true')
const setWindowMenu = () => {
  showWindowMenuState.value = !showWindowMenuState.value
  ipcRenderer.send('setWindowMenu', showWindowMenuState.value)
  localStorage.setItem('windowMenu', showWindowMenuState.value + '')
}

const openAboutWindow = () => {
  ipcRenderer.send('open-about')
}
</script>