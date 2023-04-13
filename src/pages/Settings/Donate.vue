<template>
  <TabBar 
    :title="i18n().otherList.toDonate"
    :rightImgShow="false"
    :leftImgShow="true"
    @leftClick="router.back()"
    bg-color="light"
  />
  <SettingList>
    <div 
      w="[calc(100vw-460px)]" p-20px mb-10px max-w-540px h-auto
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

<script setup lang="ts">
import TabBar from '../../components/TabBar/TabBar.vue';
import router from '../../router';
import i18n from '../../i18n';
import SettingList from "../../components/SettingList";
</script>