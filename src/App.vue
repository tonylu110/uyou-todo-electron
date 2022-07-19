<script setup lang="ts">
import { ref, Ref } from 'vue';
import i18n from './i18n';
import TitleBar from './components/TitleBar/TitleBar.vue';
import Alert from './components/Alert/Alert.vue';

const alertShow = ref(false)
const alertMsg: Ref<string[]> = ref([])

const version = 110

fetch('https://api.todo.uyou.org.cn/update/get').then(res => {
  return res.json()
}).then(res => {
  if (res[1].code > version) {
    alertMsg.value = res[1].data
    alertShow.value = true
  }
})

const returnClick = () => {
  alertShow.value = false
  window.open('https://github.com/tonylu110/uyou-todo-electron/releases')
}
</script>

<template>
  <div class="list-main">
    <TitleBar />
    <router-view></router-view>
    <Alert 
      v-if="alertShow" 
      :title="i18n().updateText"
      :body="alertMsg"
      @cancel="alertShow = false"
      @return="returnClick"
    />
    <div class="black-back" v-if="alertShow" @click="alertShow = false"></div>
  </div>
</template>

<style>
::-webkit-scrollbar {
    display: none;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  user-select: none;
}

.list-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.black-back {
  background-color: #00000030;
  height: calc(100% - 50px);
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  margin-top: 25px;
}
</style>
