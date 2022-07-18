<template>
  <div class="list">
    <div class="title-img">
      <img src="/images/logo.png" alt="" />
      <span>uyou ToDo v1.0.2</span>
    </div>
    <div class="setting-item lang-set" @click="() => langMenuShow = !langMenuShow">
      <img src="/images/lang.png" alt="" class="lang-img" />
    </div>
    <LangSet v-if="langMenuShow" />
    <div class="black-back" v-if="langMenuShow" @click="() => langMenuShow = !langMenuShow"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LangSet from './LangSet/LangSet.vue';

const langMenuShow = ref(false)
</script>

<style scoped lang="scss">
@import './style.scss';
</style>