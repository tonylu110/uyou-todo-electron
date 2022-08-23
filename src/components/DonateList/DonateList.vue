<template>
  <perfect-scrollbar class="list">
    <div class="title-img">
      <img src="/images/donate/alipay.png" alt="">
      <img src="/images/donate/wechatpay.png" alt="">
    </div>
  </perfect-scrollbar>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.list {
  background-color: #eee;
  width: calc(100vw - 300px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;
  justify-content: space-between;

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
}
</style>