<template>
  <perfect-scrollbar class="list">
    <div>
      <div class="title-img">
        <img src="/images/logo.png" alt="" />
        <span>uyou ToDo v{{ app.getVersion() }}</span>
        <span class="version" v-if="newVersion !== ''">{{ newVersion }}</span>
      </div>
      <div class="update-msg" v-if="updateMsg.length > 0">
        <span v-for="(item, index) in updateMsg" :key="index">{{ item }}</span>
      </div>
    </div>
    <ItemButton mode="primary" @click="updateButtonCilck">{{ updateButton }}</ItemButton>
  </perfect-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import i18n from '../../i18n';
import ItemButton from '../ItemBox/ItemButton/ItemButton.vue';
import appVersionCode from '../../util/appVersionCode';

const { app } = require('@electron/remote')

const version = appVersionCode

const updateMsg = ref([])
const newVersion = ref('')
const updateButton = ref('检查更新中...')
const getUpdate = () => {
  setTimeout(() => {
    fetch('https://api.todo.uyou.org.cn/update/get').then(res => {
      return res.json()
    }).then(res => {
      if (res[1].code > version) {
        newVersion.value = '新版本：v' + res[1].version
        updateMsg.value = res[1].data
        updateButton.value = '前往更新'
      } else {
        newVersion.value = '暂无更新'
        updateButton.value = '检查更新'
      }
    })
  }, Math.floor(Math.random () * 900) + 100);
}

const updateButtonCilck = () => {
  if (updateMsg.value.length === 0) {
    updateButton.value = '检查更新中...'
    newVersion.value = ''
    getUpdate()
  } else {
    window.open('https://github.com/tonylu110/uyou-todo-electron/releases')
  }
}

onMounted(() => {
  getUpdate() 
})
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
    width: calc(100vw - 440px);
    max-width: 560px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 7px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px #00000030;
    
    img {
      height: 100px;
    }
    
    span {
      margin-top: 15px;
      color: #00000050;

      &.version {
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }

  .update-msg {
    width: calc(100vw - 440px);
    max-width: 560px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 7px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px #00000030;

    span {
      display: block;
      font-size: 15px;
      color: #00000090;
      font-weight: bold;
      margin: 3px;
    }
  }
}
</style>