<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { ipcRenderer } from 'electron'
import Store from 'electron-store'
import { ElConfigProvider } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import es from 'element-plus/es/locale/lang/es'
import ja from 'element-plus/es/locale/lang/ja'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import isNull from 'lodash/isNull'
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Alert from './components/Alert/Alert.vue'
import setTime from './components/List/Item/setTime'
import ListMenu from './components/ListMenu/ListMenu.vue'
import OpenPass from './components/OpenPass/OpenPass.vue'
import RouterUrl from './components/RouterUrl'
import Setup from './components/Setup/Setup.vue'
import TitleBar from './components/TitleBar/newTitleBar'
import { versionCode } from './util/appVersionCode'
import emitter from './util/bus'
import firstLoad from './util/firstLoad'
import getCateList from './util/getCateList'
import LocalStorage from './util/localStorage'
import isDev from './util/mode'
import { isLinux, isWindows10OrAfter } from './util/os'
import type ITodoList from './interface/ITodoListArray'

const { t, locale } = useI18n()

const alertShow = ref(false)
const alertMsg = ref<string[]>([])
const newVersion = ref('')

const version = versionCode
const autoUpdateState = localStorage.getItem('autoUpdate') !== 'false'

firstLoad()

if (autoUpdateState) {
  fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
    return res.json()
  }).then((res) => {
    if (res[1].code > version) {
      if (locale.value === 'zh-cn')
        alertMsg.value = res[1].data
      else
        alertMsg.value = res[1].enData
      newVersion.value = res[1].version
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

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

router.isReady().then(() => {
  const startRoute = ref(localStorage.getItem('start') ? localStorage.getItem('start')! : 'home')
  if (startRoute.value === 'home' || isNoteUI)
    startRoute.value = '/'
  else
    startRoute.value = '/other?listName=today'
  router.push(startRoute.value)
})

const routerShow = ref((localStorage.getItem('routerShow') === 'true' || !localStorage.getItem('routerShow')) && isDev)

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
    floatY.value = '10px'
    floatBorder.value = '1px solid rgba(0, 0, 0, 0.1)'
  }
  else {
    floatWidth.value = 'auto'
    floatHeight.value = isRound.value ? 'calc(100vh - 10px)' : '100vh'
    floatY.value = isRound.value ? '9px' : '0'
    floatBorder.value = ''
  }
})

window.addEventListener('resize', () => {
  emitter.emit('menuClose', window.innerWidth < 750)
})

const isDark = usePreferredDark()

function setAllDarkMode(dark: boolean) {
  if (dark)
    document.querySelector('html')?.classList.add('dark')
  else
    document.querySelector('html')?.classList.remove('dark')
}

setAllDarkMode(isDark.value)

watch(isDark, (newValue) => {
  setAllDarkMode(newValue)
})

if (isDev) {
  onMounted(() => {
    document.querySelector('.vue-devtools-frame')?.classList.add('no-drag')
    document.querySelector('.vue-devtools-button-panel')?.classList.add('no-drag')
  })
}

const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

const store = new Store()

const useLocale = computed(() => {
  if (locale.value === 'zh-cn')
    return zhCn
  else if (locale.value === 'zh-tw')
    return zhTw
  else if (locale.value === 'ja')
    return ja
  else if (locale.value === 'es')
    return es
  else
    return en
})

onMounted(() => {
  const listData = LocalStorage('get') as ITodoList[]

  listData.forEach((item) => {
    if (item.time)
      setTime(item.time, item.text, t('todo-time'))
  })
})

const useOpenPass = ref(localStorage.getItem('useOpenPass') === 'true')
const openPass = ref(localStorage.getItem('openPass') ? localStorage.getItem('openPass') : '')
const passAlert = ref(useOpenPass.value && openPass.value !== '')

const showSetup = ref(isNull(localStorage.getItem('newNoteUI')))
</script>

<template>
  <Setup v-if="showSetup" />
  <Transition v-if="!showSetup" name="open-pass">
    <OpenPass v-if="passAlert" v-model="passAlert" />
  </Transition>
  <ElConfigProvider v-if="!showSetup" :locale="useLocale">
    <RouterUrl v-if="routerShow" />
    <div
      v-if="isNoteUI"
      :class="isDark ? 'dark' : ''"
      :bg="!isBlur
        ? (isDark
          ? 'black'
          : '#888')
        : ((isDark && store.get('micaStyle') === 'acrylic')
          ? '#111/50'
          : '')"
      h-100vh w-100vw overflow-hidden
    >
      <router-view v-if="!passAlert" name="noteUI" />
      <router-view v-if="route.name !== 'Home'" />
    </div>
    <div
      v-if="!isNoteUI" class="list-main"
      :bg="!isBlur
        ? (isDark
          ? 'black'
          : '#bbb')
        : ((isDark && store.get('micaStyle') === 'acrylic')
          ? '#111/50'
          : '')"
      :opacity="passAlert ? '0' : '100'"
      transition-opacity transition-duration-500
      :class="isDark ? 'dark list-main' : 'list-main'"
    >
      <div class="list-in">
        <div>
          <TitleBar v-if="!systemTitleShow" />
          <ListMenu />
        </div>
        <div
          class="todo-list"
          :rounded="isRound ? 'tl-15px' : newFloatUi ? '7px' : ''"
          :border-l="newFloatUi ? '' : '!1px !solid !black/10'"
          :border-t="isRound ? '!1px !solid !black/10' : ''"
        >
          <router-view />
          <Alert
            :dialog-show="alertShow"
            :title="`${t('updateText')} v${newVersion}`"
            :confirm-btn-name="t('update.gotoUpdate')"
            @cancel="() => alertShow = false"
            @return="returnClick"
          >
            <ul m-0 p-l-20px>
              <li v-for="(item, index) in alertMsg" :key="index">
                {{ item.slice(2) }}
              </li>
            </ul>
          </Alert>
        </div>
      </div>
    </div>
  </ElConfigProvider>
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
      margin-top: v-bind(floatY);
      margin-right: v-bind(floatWidth);
      height: v-bind(floatHeight);
      overflow: hidden;
      border: v-bind(floatBorder);
    }
  }
}

.open-pass-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.3s, 0.4s;
}

.open-pass-enter-from,
.open-pass-leave-to {
  opacity: 0;
  transform: scale(3);
}
</style>
