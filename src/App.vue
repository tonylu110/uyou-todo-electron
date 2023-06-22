<script setup lang="ts">
import { ref, Ref, onBeforeUnmount, onMounted } from 'vue';
import i18n from './i18n';
import TitleBar from './components/TitleBar/newTitleBar';
import Alert from './components/Alert/Alert.vue';
import ListMenu from './components/ListMenu/ListMenu.vue';
import { versionCode } from './util/appVersionCode'
import { useRoute, useRouter } from 'vue-router';
import RouterUrl from './components/RouterUrl'
import emitter from './util/bus';
import isDev from './util/mode';
import getCateList from './util/getCateList';

const ipcRenderer = require('electron').ipcRenderer

const alertShow = ref(false)
const alertMsg: Ref<string[]> = ref([])
const newVersion = ref('')

const version = versionCode
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

onMounted(() => {
  setTimeout(() => {
    getCateList()
  }, 0)
})

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

const systemTitleShow = localStorage.getItem('systemTitle') === 'true'

const route = useRoute()
const router = useRouter()
const isWinDow = ref(true)

router.isReady().then(() => {
  isWinDow.value = route.query.isWin === 'true'
})

const routerShow = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)
 
emitter.on('routerShow', (data: unknown) => {
  routerShow.value = (data as boolean)
})
 
onBeforeUnmount(() => {
  emitter.off('routerShow')
})
</script>

<template>
  <router-url v-if="routerShow"/>
  <router-view name="isWindow"></router-view>
  <div class="list-main" v-if="!isWinDow">
    <div class="list-in">
      <div>
        <TitleBar v-if="!systemTitleShow" />
        <ListMenu />
      </div>
      <div class="todo-list">
        <router-view></router-view>
        <Alert 
          :dialogShow="alertShow"
          :title="`${i18n().updateText} v${newVersion}`"
          @cancel="() => alertShow = false"
          @return="returnClick"
        >
          <ul>
            <li v-for="(item, index) in alertMsg" :key="index">{{ item.slice(2) }}</li>
          </ul>
        </Alert>
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
      width: calc(100vw - 300px);
      height: 100vh;
      overflow: hidden;
    }
  }
}
</style>
