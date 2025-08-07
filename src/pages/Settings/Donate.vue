<script setup lang="ts">
import { ref } from 'vue'
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
    <ItemSpace flex="~ wrap gap-10px" items-center justify-center>
      <img
        w-163px
        src="/images/donate/alipay.png"
        alt=""
      >
      <img
        w-163px
        src="/images/donate/wechatpay.png"
        alt=""
      >
      <div flex="~ col" w-163px items-center bg-afd-d p-10px>
        <img
          w-full
          src="/images/donate/afd.png"
          alt=""
        >
        <button
          bg="white dark:#333 active:afd-a hover:afd-h" c="#956DE5 hover:white"
          mt-10px rounded-1 border-none px-4 py-2 font-bold outline-none
          @click="openUrlInBrowser('https://afdian.com/a/tonylu')"
        >
          {{ t('afd') }}
        </button>
      </div>
      <img
        w-163px
        src="/images/donate/paypal.png"
        alt=""
      >
    </ItemSpace>
    <Item :title="t('otherList.aboutSponser')" @item-fun="openUrlInBrowser('https://github.com/tonylu110/uyou-todo-electron/discussions/34')" />
    <SponsorList />
  </SettingList>
</template>
