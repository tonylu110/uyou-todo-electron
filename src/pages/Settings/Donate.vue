<script setup lang="ts">
import { ref } from 'vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import i18n from '../../i18n'
import SettingList from '../../components/SettingList'
import emitter from '../../util/bus'

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})
</script>

<template>
  <TabBar
    :title="i18n().otherList.toDonate"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList>
    <div
      :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'" p-20px mb-10px max-w-540px h-auto
      flex="~ wrap" justify-center items-center
      bg-white rounded-7px shadow-item
    >
      <img
        w-250px p-10px
        src="/images/donate/alipay.png"
        alt=""
      >
      <img
        w-250px p-10px
        src="/images/donate/wechatpay.png"
        alt=""
      >
    </div>
  </SettingList>
</template>
