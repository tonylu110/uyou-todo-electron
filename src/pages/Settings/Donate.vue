<template>
  <TabBar 
    :title="i18n().otherList.toDonate"
    :rightImgShow="false"
    :leftImgShow="true"
    @leftClick="router.back()"
    bg-color="light"
  />
  <SettingList>
    <div class="title-img">
      <img src="/images/donate/alipay.png" alt="">
      <img src="/images/donate/wechatpay.png" alt="">
    </div>
  </SettingList>
</template>

<script setup lang="ts">
import TabBar from '../../components/TabBar/TabBar.vue';
import router from '../../router';
import i18n from '../../i18n';
import SettingList from "../../components/SettingList/SettingList.vue";
</script>

<style lang="scss" scoped>
.title-img {
  width: calc(100vw - 460px);
  padding: 20px;
  max-width: 540px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  border-radius: 7px;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px #00000030;

  img {
    width: 250px;
    padding: 10px;
  }
}
</style>