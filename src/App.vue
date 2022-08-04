<script setup lang="ts">
import { ref, Ref } from 'vue';
import i18n from './i18n';
import TitleBar from './components/TitleBar/TitleBar.vue';
import Alert from './components/Alert/Alert.vue';
import ListMenu from './components/ListMenu/ListMenu.vue';

const alertShow = ref(false)
const alertMsg: Ref<string[]> = ref([])

const version = 112

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
</script>

<template>
  <div class="list-main">
    <TitleBar />
    <div class="list-in">
      <ListMenu />
      <div class="todo-list">
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
    </div>
  </div>
</template>

<style lang="scss">
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

  .list-in {
    display: flex;
    flex-direction: row;
    
    .todo-list {
      height: calc(100vh - 106px);
    }
  }
}

.black-back {
  background-color: #00000030;
  backdrop-filter: blur(10px);
  height: calc(100% - 50px);
  width: calc(100vw - 300px);
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  margin-top: 25px;
}
</style>
