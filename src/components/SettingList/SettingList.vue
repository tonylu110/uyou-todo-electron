<template>
  <div class="list">
    <div class="title-img">
      <img src="/images/logo.png" alt="" />
      <span>uyou ToDo v{{ app.getVersion() }}</span>
    </div>
    <!-- <div class="setting-item" @click="() => router.push('/account')">
      <span>{{ loginState ? i18n().myAccount : i18n().loginText }}</span>
      <span class="material-icons">arrow_forward_ios</span>
    </div> -->
    <div v-if="loginState" class="setting-item" style="background-color: white; color: black;">
      <span>{{ i18n().setTopState }}</span>
      <Switch 
        :swichState="saveTopState"
        @switch="setTopState"
      />
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
import Switch from '../Switch/Switch.vue';
import i18n from '../../i18n';

const { app } = require('@electron/remote')

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const langMenuShow = ref(false)

const saveTopState = ref(localStorage.getItem('saveTopState') === 'true' || localStorage.getItem('saveTopState') === null)
const setTopState = () => {
  saveTopState.value = !saveTopState.value
  localStorage.setItem('saveTopState', saveTopState.value + '')
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>