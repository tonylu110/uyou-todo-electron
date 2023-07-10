<script setup lang="ts">
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TitleBar from './components/TitleBar/newTitleBar'
import Alert from './components/Alert/Alert.vue'
import ListMenu from './components/ListMenu/ListMenu.vue'
import { versionCode } from './util/appVersionCode'
import RouterUrl from './components/RouterUrl'
import emitter from './util/bus'
import isDev from './util/mode'
import getCateList from './util/getCateList'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

const alertShow = ref(false)
const alertMsg: Ref<string[]> = ref([])
const newVersion = ref('')

const version = versionCode
const autoUpdateState = localStorage.getItem('autoUpdate') !== 'false'

if (autoUpdateState) {
  fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
    return res.json()
  }).then((res) => {
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

function returnClick() {
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
    width: window.innerWidth,
  })
})

const systemTitleShow = localStorage.getItem('systemTitle') === 'true'

const route = useRoute()
const router = useRouter()
const isWinDow = ref(true)

router.isReady().then(() => {
  isWinDow.value = route.query.isWin === 'true'
  if (!isWinDow.value) {
    const startRoute = ref(localStorage.getItem('start') ? localStorage.getItem('start')! : 'home')
    if (startRoute.value === 'home')
      startRoute.value = '/'
    else
      startRoute.value = '/other?listName=today'
    router.push(startRoute.value)
  }
})

const routerShow = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)

emitter.on('routerShow', (data: unknown) => {
  routerShow.value = (data as boolean)
})

onBeforeUnmount(() => {
  emitter.off('routerShow')
  emitter.off('setNewFloatUi')
})

const isRound = ref(false)

const isWindows = navigator.userAgent.includes('Win')
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && localStorage.getItem('systemTitle') === 'true' && !(localStorage.getItem('simpleMode') === 'true'))
  isRound.value = true

const newFloatUi = ref(localStorage.getItem('newFloatUi') === 'true')
const floatWidth = ref('calc(100vw - 300px)')
const floatHeight = ref('100vh')
const floatY = ref('translateY(0px)')
const floatBorder = ref('none')

emitter.on('setNewFloatUi', () => {
  newFloatUi.value = !newFloatUi.value
})

watchEffect(() => {
  if (newFloatUi.value) {
    floatWidth.value = '10px'
    floatHeight.value = 'calc(100vh - 20px)'
    floatY.value = 'translateY(10px)'
    floatBorder.value = '1px solid rgba(0, 0, 0, 0.1)'
  }
  else {
    floatWidth.value = 'auto'
    floatHeight.value = '100vh'
    floatY.value = 'translateY(0px)'
    floatBorder.value = ''
  }
})

window.addEventListener('resize', () => {
  emitter.emit('menuClose', window.innerWidth < 750)
})

if (isDev) {
  onMounted(() => {
    document.querySelector('.vue-devtools-frame')?.classList.add('no-drag')
    document.querySelector('.vue-devtools-button-panel')?.classList.add('no-drag')
  })
}
</script>

<template>
  <RouterUrl v-if="routerShow" />
  <router-view name="isWindow" />
  <div v-if="!isWinDow" class="list-main">
    <div class="list-in">
      <div>
        <TitleBar v-if="!systemTitleShow" />
        <ListMenu />
      </div>
      <div
        class="todo-list"
        :rounded="isRound ? 'tl-15px' : newFloatUi ? '7px' : ''"
        :border-l="newFloatUi ? '' : '!1px !solid !black/10'"
      >
        <router-view />
        <Alert
          :dialog-show="alertShow"
          :title="`${t('updateText')} v${newVersion}`"
          @cancel="() => alertShow = false"
          @return="returnClick"
        >
          <ul>
            <li v-for="(item, index) in alertMsg" :key="index">
              {{ item.slice(2) }}
            </li>
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
      flex: 1;
      transform: v-bind(floatY);
      margin-right: v-bind(floatWidth);
      height: v-bind(floatHeight);
      overflow: hidden;
      border: v-bind(floatBorder);
    }
  }
}
</style>
