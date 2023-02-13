<script setup lang="ts">
import { ref, Ref } from 'vue';
import i18n from './i18n';
import TitleBar from './components/TitleBar/TitleBar.vue';
import Alert from './components/Alert/Alert.vue';
import ListMenu from './components/ListMenu/ListMenu.vue';
import appVersionCode from './util/appVersionCode'

const ipcRenderer = require('electron').ipcRenderer

const alertShow = ref(false)
const alertMsg: Ref<string[]> = ref([])
const newVersion = ref('')

const version = appVersionCode
const autoUpdateState = localStorage.getItem('autoUpdate') !== 'false'

if (autoUpdateState) {
  fetch('https://api.todo.uyou.org.cn/update/get').then(res => {
    return res.json()
  }).then(res => {
    if (res[1].code > version) {
      newVersion.value = res[1].version
      alertMsg.value = res[1].data
      alertShow.value = true
    }
  })
}

const returnClick = () => {
  alertShow.value = false
  ipcRenderer.send('open-url', 'https://github.com/tonylu110/uyou-todo-electron/releases')
}

// const autoSync = localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null
// if (autoSync) {
//   const uid = localStorage.getItem('uid')
//   if (uid !== '' && uid !== null) {
//     fetch('https://api.todo.uyou.org.cn/gettodo', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         uid: uid
//       })
//     }).then(res => {
//       return res.json()
//     }).then(res => {
//       localStorage.setItem('ToDo', res.data)
//     })
//   }
// }

window.addEventListener('resize', () => {
  ipcRenderer.send('getWindowSize', {
    height: window.innerHeight,
    width: window.innerWidth
  })
})

const titleBarShow = localStorage.getItem('systemTitle') === 'true'
</script>

<template>
  <div class="list-main">
    <TitleBar />
    <div class="list-in">
      <ListMenu />
      <div class="todo-list" :style="{height: titleBarShow ? 'calc(100vh - 65px)' : ''}">
        <router-view></router-view>
        <Alert 
          :dialogShow="alertShow"
          :title="`${i18n().updateText} v${newVersion}`"
          :body="alertMsg"
          @cancel="() => alertShow = false"
          @return="returnClick"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list-main {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .list-in {
    display: flex;
    flex-direction: row;
    
    .todo-list {
      height: calc(100vh - 105px);
    }
  }
}
</style>
