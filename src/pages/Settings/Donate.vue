<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Item from '../../components/ItemBox/Item/Item.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import SponsorList from '../../components/Sponsor/List.vue'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import emitter from '../../util/bus'
import openUrlInBrowser from '../../util/openUrlInBrowser'

const { t } = useI18n()

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
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
        :title="t('afd')"
        @click="openUrlInBrowser('https://afdian.com/a/tonylu')"
      >
      <img
        w-163px p-10px
        src="/images/donate/paypal.png"
        alt=""
      >
    </ItemSpace>
    <Item :title="t('otherList.aboutSponser')" @item-fun="openUrlInBrowser('https://github.com/tonylu110/uyou-todo-electron/discussions/34')" />
    <SponsorList />
  </SettingList>
</template>
