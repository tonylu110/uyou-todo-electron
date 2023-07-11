<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import emitter from '../../util/bus'

const { t } = useI18n()

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})
</script>

<template>
  <TabBar
    :title="t('otherList.toDonate')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList>
    <div
      :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'" p-20px mb-10px max-w-540px h-auto
      flex="~ wrap" justify-center items-center
      bg="white dark:#999/10" rounded-7px border="1px solid #00000020"
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
