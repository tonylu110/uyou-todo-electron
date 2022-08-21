<template>
  <perfect-scrollbar class="list">
    <div class="title-img">
      <img src="/images/logo.png" alt="" />
      <span>uyou ToDo v{{ app.getVersion() }}</span>
    </div>
    <Item 
      :title="loginState ? i18n().myAccount : i18n().loginText" 
      @itemFun="() => router.push('/account?from=setting')" 
    />
    <ItemBox>
      <Item
        title="自动获取更新"
        :showSwitch="true"
      />
      <Item
        title="软件更新" 
      />
    </ItemBox>
    <ItemBox>
      <Item 
        :title="i18n().setTopState" 
        :showSwitch="true"
        :switchState="saveTopState"
        @switchFun="setTopState" 
      />
      <Item 
        :title="i18n().saveWindowSize"
        :showSwitch="true" 
        :switchState="saveWindowSizeState"
        @switchFun="setWindowSizeState"
      />
    </ItemBox>
    <ItemButton mode="error" @click="clearData">{{ i18n().clearData }}</ItemButton>
    <ItemButton @click="() => langMenuShow = !langMenuShow">
      <img src="/images/lang.png" alt="" class="lang-img" />
    </ItemButton>
    <LangSet v-if="langMenuShow" />
    <div class="black-back" v-if="langMenuShow" @click="() => langMenuShow = !langMenuShow"></div>
  </perfect-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LangSet from './LangSet/LangSet.vue';
import i18n from '../../i18n';
import Item from '../ItemBox/Item/Item.vue';
import ItemBox from '../ItemBox/ItemBox.vue';
import ItemButton from '../ItemBox/ItemButton/ItemButton.vue';
import router from '../../router';

const ipcRenderer = require('electron').ipcRenderer

const { app } = require('@electron/remote')

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const langMenuShow = ref(false)

const saveTopState = ref(localStorage.getItem('saveTopState') === 'true' || localStorage.getItem('saveTopState') === null)
const setTopState = () => {
  saveTopState.value = !saveTopState.value
  localStorage.setItem('saveTopState', saveTopState.value + '')
}

const saveWindowSizeState = ref(localStorage.getItem('saveWindowSizeState') === 'true')
const setWindowSizeState = () => {
  saveWindowSizeState.value = !saveWindowSizeState.value
  localStorage.setItem('saveWindowSizeState', saveWindowSizeState.value + '')
  ipcRenderer.send('setWindowSizeState', saveWindowSizeState.value)
}

const clearData = () => {
  localStorage.clear()
  window.location.reload()
}
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

  .title-img {
    width: calc(100vw - 480px);
    max-width: 520px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 7px;
    padding: 30px;
    margin-bottom: 15px;
    box-shadow: 0 2px 10px #00000030;
    
    img {
      height: 100%;
    }
    
    span {
      margin-top: 15px;
      color: #00000050;
    }
  }
}
</style>