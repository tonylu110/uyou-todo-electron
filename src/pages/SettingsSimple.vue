<template>
  <tab-bar
    :title="i18n().settingTitleText"
    :right-img-show="false"
    @left-click="router.back()"
    bg-color="light"
  />
  <setting-list>
    <Item
      :title="loginState ? i18n().myAccount : i18n().loginText"
      @item-fun="() => router.push('/account?from=setting')"
    />
    <Item
      :title="i18n().update.updateTitle"
      @item-fun="router.push('/update?from=setting')"
    />
    <ItemBox>
      <Item
        :title="i18n().anotherSettings.simple"
        :show-switch="true"
        :switch-state="simpleModeState"
        @switch-fun="changeSimpleMode"
      />
      <Item
        :title="i18n().anotherSettings.enterToAdd"
        :show-switch="true"
        :switch-state="enterAddState"
        @switch-fun="enterAdd"
      />
    </ItemBox>
    <ItemBox>
      <Item
        :title="i18n().useSystemBar"
        :show-switch="true"
        :switch-state="useSystemTitleBar"
        @switch-fun="setTitleBar"
      />
      <Item
        :title="i18n().setTopWindow"
        :showSwitch="true"
        :switchState="topState"
        @switchFun="onTopWindow"
      />
      <Item
        v-if="isLinux"
        :title="i18n().anotherSettings.menuBlur"
        :showSwitch="true"
        :switchState="menuBlurState"
        @switchFun="setMenuBlur"
      />
    </ItemBox>
    <ItemButton mode="error" @click="clearData">{{ i18n().clearData }}</ItemButton>
    <ItemButton @click="router.push('/lang?from=setting')">
      <img src="/images/lang.png" alt="" class="lang-img" />
    </ItemButton>
    <Toast :msg="i18n().restartApp" v-if="toastShow" />
  </setting-list>
</template>

<script setup lang="ts">

import TabBar from "../components/TabBar/TabBar.vue";
import i18n from "../i18n";
import router from "../router";
import SettingList from "../components/SettingList/SettingList.vue";
import Item from "../components/ItemBox/Item/Item.vue";
import { ref } from "vue";
import Toast from "../components/Toast/Toast.vue";
import ItemBox from "../components/ItemBox/ItemBox.vue";
import firstLoad from "../components/TitleBar/firstLoad";
import ItemButton from "../components/ItemBox/ItemButton/ItemButton.vue";

const { ipcRenderer } = require("electron");

const isLinux = !(process.platform === 'linux')

const toastShow = ref(false)

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const simpleModeState = ref(localStorage.getItem('simpleMode') === 'true')
const changeSimpleMode = () => {
  simpleModeState.value = !simpleModeState.value
  localStorage.setItem('simpleMode', simpleModeState.value + '')
  ipcRenderer.send('setSimple', simpleModeState.value)
  toastShow.value = true
  setTimeout(() => {
    toastShow.value = false
  }, 700);
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

const clearData = () => {
  localStorage.clear()
  window.location.reload()
}

const enterAddState = ref(localStorage.getItem('enterAdd') === 'true')
const enterAdd = () => {
  enterAddState.value = !enterAddState.value
  localStorage.setItem('enterAdd', enterAddState.value + '')
}
</script>