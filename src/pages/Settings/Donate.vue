<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { shell } from 'electron'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import emitter from '../../util/bus'
import ItemSpace from '../../components/ItemBox/ItemSpace'
import Item from '../../components/ItemBox/Item/Item.vue'
import SponsorList from '../../components/Sponsor/List.vue'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'

const { t } = useI18n()

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})

onUnmounted(() => {
  emitter.off('menuClose')
})

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('otherList.toDonate')" />
  <TabBar
    v-else
    :title="t('otherList.toDonate')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <ItemSpace flex="~ wrap" items-center justify-center>
      <img
        w-163px p-10px
        src="/images/donate/alipay.png"
        alt=""
      >
      <img
        w-163px p-10px
        src="/images/donate/wechatpay.png"
        alt=""
      >
      <img
        w-163px p-10px
        src="/images/donate/afd.png"
        alt=""
      >
      <img
        w-163px p-10px
        src="/images/donate/paypal.png"
        alt=""
      >
    </ItemSpace>
    <Item :title="t('otherList.aboutSponser')" @item-fun="shell.openExternal('https://github.com/tonylu110/uyou-todo-electron/discussions/34')" />
    <SponsorList />
  </SettingList>
</template>
