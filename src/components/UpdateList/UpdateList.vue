<template>
  <perfect-scrollbar class="list">
    <div>
      <div class="title-img">
        <img src="/images/logo.png" alt="" />
        <span :style="{marginBottom: newVersion !== '' ? '' : '15px'}">uyou ToDo v{{ app.getVersion() }}</span>
        <span class="version" v-if="newVersion !== ''">{{ newVersion }}</span>
        <div class="update-msg" v-if="updateMsg.length > 0">
          <span class="update-title">{{ i18n().update.updateLog }}</span>
          <ul>
            <li v-for="(item, index) in updateMsg" :key="index">{{ item.split(' ')[1] }}</li>
          </ul>
        </div>
      </div>
    </div>
    <ItemButton mode="primary" @click="updateButtonCilck">{{ updateButton }}</ItemButton>
    <Toast :msg="newVersion" v-if="toastShow" />
  </perfect-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import i18n from '../../i18n';
import ItemButton from '../ItemBox/ItemButton/ItemButton.vue';
import appVersionCode from '../../util/appVersionCode';
import Toast from '../Toast/Toast.vue';

const { app } = require('@electron/remote')

const version = appVersionCode

const updateMsg: Ref<string[]> = ref([])
const newVersion = ref('')
const updateButton = ref(i18n().update.checkingUpdate)
const toastShow = ref(false)
const getUpdate = () => {
  setTimeout(() => {
    fetch('https://api.todo.uyou.org.cn/update/get').then(res => {
      return res.json()
    }).then(res => {
      if (res[1].code > version) {
        newVersion.value = `${i18n().updateText}: v${res[1].version}`
        updateMsg.value = res[1].data
        updateButton.value = i18n().update.gotoUpdate
      } else {
        newVersion.value = i18n().update.notUpdate
        updateButton.value = i18n().update.checkUpdate
        toastShow.value = true
        setTimeout(() => {
          toastShow.value = false
        }, 700);
      }
    })
  }, Math.floor(Math.random () * 900) + 100);
}

const updateButtonCilck = () => {
  if (updateMsg.value.length === 0) {
    updateButton.value = i18n().update.checkingUpdate
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
    margin-bottom: 10px;
    box-shadow: 0 2px 10px #00000030;

    .update-msg {
      height: auto;
      width: calc(100vw - 470px);
      max-width: 530px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px solid #00000020;
      padding: 5px 15px;

      ul {
        width: 100%;
        padding-left: 20px;

        li {
          font-size: 15px;
          color: #00000090;
          font-weight: bold;
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .update-title {
        color: black;
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
      }
    }
    
    img {
      height: 100px;
      margin: 15px 0;
    }
    
    span {
      color: #00000050;

      &.version {
        margin-top: 5px;
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>