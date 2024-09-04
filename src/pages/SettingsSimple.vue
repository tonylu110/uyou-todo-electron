<script setup lang="ts">
import os from 'node:os'
import { useI18n } from 'vue-i18n'
import TabBar from '../components/TabBar/TabBar.vue'
import router from '../router'
import SettingList from '../components/SettingList/SettingList.vine'
import Item from '../components/ItemBox/Item/Item.vue'
import ItemButton from '../components/ItemBox/ItemButton/ItemButton.vue'
import ColorChange from '../components/SettingList/colorChange/colorChange.vine'
import DevSettings from '../components/SettingList/DevSettings.vine'
import UserSettings from '../components/SettingList/UserSettings.vine'
import UpdateSettings from '../components/SettingList/UpdateSettings.vine'
import AppUseSettings from '../components/SettingList/AppUseSettings.vine'
import ToDoSettings from '../components/SettingList/ToDoSettings.vine'
import WindowSettings from '../components/SettingList/WindowSettings/WindowSettings.vine'

const { t } = useI18n()

const isLinux = !(process.platform === 'linux')
const isWindows10OrAfter = Number(os.release().split('.')[2]) > 15063
const isMac = process.platform === 'darwin'

function clearData() {
  localStorage.clear()
  window.location.reload()
}

const isInDev = localStorage.getItem('isInDev') === 'true'
const localLang = navigator.language.toLowerCase()
</script>

<template>
  <TabBar
    :title="t('settingTitleText')"
    :right-img-show="false"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList>
    <DevSettings />
    <ColorChange v-if="(!isLinux || isWindows10OrAfter) || isMac" />
    <Item :title="t('vip.proVersion')" icon="i-icon-park:vip-one" @item-fun="router.push('/vip?from=setting')" />
    <UserSettings />
    <Item
      icon="i-icon-park:two-dimensional-code"
      :title="t('anotherSettings.model')"
      @item-fun="router.push('/mode?from=setting')"
    />
    <UpdateSettings />
    <AppUseSettings />
    <ToDoSettings />
    <WindowSettings />
    <Item v-if="isInDev" :title="t('anotherSettings.laboratory')" @item-fun="router.push('/lab?from=setting')" />
    <ItemButton mode="error" @click="clearData">
      {{ t('clearData') }}
    </ItemButton>
    <ItemButton @click="router.push('/lang?from=setting')">
      <div flex gap-4>
        <div i-flagpack:us text-5 drop-shadow-md />
        <div i-flagpack:gb-ukm text-5 drop-shadow-md />
        <div i-flagpack:es text-5 drop-shadow-md />
        <div i-flagpack:cn text-5 drop-shadow-md />
        <div i-flagpack:hk text-5 drop-shadow-md />
        <div v-if="localLang === 'zh-tw'" i-flagpack:tw text-5 drop-shadow-md />
        <div i-flagpack:jp text-5 drop-shadow-md />
      </div>
    </ItemButton>
  </SettingList>
</template>
