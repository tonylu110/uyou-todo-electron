<template>
  <div class="list">
    <div class="title-img">
      <img src="/images/logo.png" alt="" />
      <span>uyou ToDo v1.1.1</span>
    </div>
    <div class="setting-item" @click="() => router.push('/account')">
      <span>{{ loginState ? i18n().myAccount : i18n().loginText }}</span>
      <span class="material-icons">arrow_forward_ios</span>
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
import router from '../../router';
import LangSet from './LangSet/LangSet.vue';
import i18n from '../../i18n';

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const langMenuShow = ref(false)
</script>

<style scoped lang="scss">
@import './style.scss';
</style>