<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import emitter from '../../util/bus'
import Item from '../../components/ItemBox/Item/Item.vue'
import setSwitchFn from '../../util/setSwitchFn'

const { t } = useI18n()

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})

const isVip = ref(localStorage.getItem('isVip') === 'true')
</script>

<template>
  <TabBar
    :title="t('vip.proVersion')"
    :right-img-show="false"
    :left-img-show="true"
    @left-click="router.back()"
  />
  <SettingList>
    <div
      v-if="!isVip"
      :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'" p-20px mb-10px max-w-540px
      h-auto flex="~ wrap" justify-center
      items-center bg="white dark:#999/10" rounded-7px
      border="1px solid #00000020"
    >
      <div w="100%">
        <h1>￥ 10.00</h1>
        <h4>{{ t('vip.8yuan') }}</h4>
        <p whitespace-pre-line>
          {{ t('vip.msg') }}
        </p>
      </div>
      <div flex="~ wrap" justify-center items-center>
        <img
          w-170px p-10px
          src="/images/donate/alipay.png"
          alt=""
        >
        <img
          w-170px p-10px
          src="/images/donate/wechatpay.png"
          alt=""
        >
      </div>
    </div>
    <div
      v-else
      :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'" p-20px mb-10px max-w-540px
      h-auto flex justify-start items-center
      bg="warn-a" rounded-7px
      border="1px solid #00000020"
    >
      <img src="/images/VIP.png" w-70px h-70px alt="" srcset="">
      <div flex="~ col gap-5px" ml-10px>
        <span text-18px font-bold>{{ t('vip.doPay') }}</span>
        <span text-14px>{{ t('vip.thanks') }}</span>
      </div>
    </div>
    <Item
      :title="t('vip.isPay')"
      :show-switch="true"
      :switch-state="isVip"
      @switch-fun="setSwitchFn('isVip', !isVip, () => isVip = !isVip)"
    />
    <div
      :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'" p-20px mb-10px max-w-540px h-auto
      flex="~ col wrap" justify-center items-start
      bg="white dark:#999/10" rounded-7px border="1px solid #00000020"
    >
      <h2>{{ t('vip.proFeature') }}</h2>
      <ul>
        <li>{{ t('vip.custColor') }}</li>
        <li>{{ t('vip.showList') }}</li>
        <li>{{ t('vip.more') }}</li>
      </ul>
    </div>
    <template v-if="isVip">
      <Item
        :title="t('custListItem')"
        @item-fun="router.push('/setListItem?from=setting')"
      />
    </template>
  </SettingList>
</template>
