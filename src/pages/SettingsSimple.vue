<template>
  <tab-bar
    :title="i18n().settingTitleText"
    :right-img-show="false"
    @left-click="router.back()"
  />
  <setting-list>
    <Item
        title="极简模式"
        :show-switch="true"
        :switch-state="simpleModeState"
        @switch-fun="changeSimpleMode"
    />
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
const { ipcRenderer } = require("electron");

const toastShow = ref(false)

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
</script>

<style scoped lang="scss">

</style>