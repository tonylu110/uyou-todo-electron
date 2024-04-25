<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import emitter from '../../util/bus'
import ItemSpace from '../../components/ItemBox/ItemSpace'

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
    <ItemSpace flex="~ wrap" items-center justify-center>
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
    </ItemSpace>
  </SettingList>
</template>
