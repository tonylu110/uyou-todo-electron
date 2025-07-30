import { ipcRenderer } from 'electron'
import { debounce } from 'lodash-es'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Alert from '../components/Alert/Alert.vue'
import CateAdd from '../components/NoteList/CateAdd/CateAdd.vue'
import NoteList from '../components/NoteList/NoteList.vue'
import OtherNoteList from '../components/NoteList/OtherNoteList.vue'
import SpNoteList from '../components/NoteList/SpNoteList.vue'
import Search from '../components/Search/Search.vue'
import SettingList from '../components/SettingList/SettingList.vine'
import WindowButtons from '../components/TabBar/windowButtons'
import Divider from '../components/Tabs/SideBar/Divider/Divider.vue'
import Item from '../components/Tabs/SideBar/Item/Item.vue'
import SideBar from '../components/Tabs/SideBar/SideBar.vue'
import Tab from '../components/Tabs/Tab/Tab.vue'
import Tabs from '../components/Tabs/Tabs.vue'
import firstLoad from '../components/TitleBar/firstLoad'
import { useTodoStore } from '../store/todoStore'
import { versionCode } from '../util/appVersionCode'
import emitter from '../util/bus'
import getCateList from '../util/getCateList'
import { isMac } from '../util/os'
import { topWindow } from '../util/windowApi'

function NoteUI() {
  const router = useRouter()
  const { t, locale } = useI18n()

  const noteComponents = {
    all: NoteList,
    use: SpNoteList,
    other: OtherNoteList,
  } as const

  const alertShow = ref(false)
  const alertMsg = ref<string[]>([])
  const newVersion = ref('')

  const version = versionCode
  const autoUpdateState = localStorage.getItem('autoUpdate') !== 'false'

  const checkUpdate = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await fetch('https://api.todo.uyou.org.cn/update/get', {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const res = await response.json()
      if (res[1].code > version) {
        alertMsg.value = locale.value === 'zh-cn' ? res[1].data : res[1].enData
        newVersion.value = res[1].version
        alertShow.value = true
      }
    }
    catch (error) {
      console.error('Update check failed:', error)
    }
  }

  if (autoUpdateState) {
    checkUpdate()
  }

  function returnClick() {
    alertShow.value = false
    ipcRenderer.send('open-url', 'https://github.com/tonylu110/uyou-todo-electron/releases')
  }

  const showCateAdd = ref(false)

  const topState = ref(firstLoad())
  function onTopWindow() {
    topState.value = !topState.value
    topWindow(topState.value)
    localStorage.setItem('alwaysOnTop', `${topState.value}`)
    emitter.emit('topWindow', topState.value)
  }
  emitter.on('topWindow', (data: unknown) => {
    topState.value = (data as boolean)
  })

  onUnmounted(() => {
    emitter.off('topWindow')
  })

  const listId = ref('all')

  const lableWidth = ref('')
  const lableLeft = ref('0')
  const tabsRef = ref<{
    $el: HTMLDivElement
  }>()
  function choose(id: string, width: string, left: number) {
    setLab(width, left)
    listId.value = id
  }

  function setLab(width: string, left: number) {
    lableWidth.value = width
    lableLeft.value = `${left - (tabsRef.value!.$el.getBoundingClientRect().left + 12)}px`
  }

  const showTab = ref(!(window.innerWidth < 640))

  const handleResize = debounce(() => {
    showTab.value = window.innerWidth >= 640
  }, 200)

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    handleResize.cancel()
  })

  const openSideBar = ref(false)

  const showSearch = ref(false)

  const uid = ref(localStorage.getItem('uid'))
  const autoSync = ref(localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null)

  const isLoading = ref(false)

  const todoStore = useTodoStore()

  async function sync() {
    if (!uid.value) {
      router.push('/account?from=setting')
      return
    }

    try {
      isLoading.value = true
      const success = await todoStore.syncFromServer(uid.value)
      if (success) {
        await getCateList()
        window.location.reload()
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const textWrapState = ref(localStorage.getItem('textWrap') === 'true' || localStorage.getItem('textWrap') === null)

  const updateTitle = computed(() => `${t('updateText')} v${newVersion}`)

  watch(textWrapState, (newValue) => {
    emitter.emit('textOpen', newValue)
  })

  const systemTitle = localStorage.getItem('systemTitle') === 'true'

  const hasScrolled = ref(false)
  const currentScroll = ref(0)

  watch(currentScroll, (newVal) => {
    if (!hasScrolled.value && newVal > 0) {
      hasScrolled.value = true
    }
    else if (hasScrolled.value && newVal === 0) {
      hasScrolled.value = false
    }
  })

  function getScroll(top: number) {
    currentScroll.value = top
  }

  vineStyle.scoped(css`
    .list-enter-from,
    .list-leave-to {
      --uno: scale-60 op-0;
    }
    
    .list-enter-to,
    .list-leave-from {
      --uno: scale-100 op-100;
    }
    
    .list-enter-active,
    .list-leave-active {
      --uno: transition-transform,
        opacity transition-duration-300 transition-ease-in-out;
    }
    
    .shadow-transition-enter-from,
    .shadow-transition-leave-to {
      opacity: 0;
    }
    
    .shadow-transition-enter-to,
    .shadow-transition-leave-from {
      opacity: 1;
    }
    
    .shadow-transition-enter-active,
    .shadow-transition-leave-active {
      transition: opacity 0.3s ease-in-out;
    }
  `)

  return vine`
    <SettingList h="![calc(100vh-160px)]" p-y="!80px" @get-scroll="getScroll">
      <div class="fixed left-0 top-0 h-65px w-full drag" />
      <div class="fixed left-0 top-0 h-full w-12vw drag" />
      <div class="fixed right-0 top-0 h-full w-12vw drag" />
      <Transition name="shadow-transition">
        <div
          v-if="hasScrolled"
          class="pointer-events-none z-1 fixed left-0 top-0 w-full h-10 bg-gradient-to-t to-black/30 from-black/0"
        />
      </Transition>
      <SideBar :open="openSideBar" @set-side="openSideBar = false">
        <Item
          id="all"
          icon="i-f7:square-list"
          :title="t('noteui.allcate')"
          :selected="listId === 'all'"
          @click="listId = 'all'"
        />
        <Item
          id="use"
          icon="i-f7:staroflife"
          :title="t('noteui.spcate')"
          :selected="listId === 'use'"
          @click="listId = 'use'"
        />
        <Item
          id="other"
          icon="i-f7:today"
          :title="t('noteui.othercate')"
          :selected="listId === 'other'"
          @click="listId = 'other'"
        />
        <Divider />
        <Item
          :icon="
            textWrapState
              ? 'i-f7:arrow-down-right-arrow-up-left'
              : 'i-f7:arrow-up-left-arrow-down-right'
          "
          :title="textWrapState ? t('noteui.closetext') : t('noteui.opentext')"
          :selected="false"
          @click="textWrapState = !textWrapState"
        />
        <Item
          icon="i-f7:search"
          :title="t('noteui.search')"
          :selected="false"
          @click="showSearch = true"
        />
      </SideBar>
      <Tabs
        ref="tabsRef"
        :lab-width="lableWidth"
        :lab-left="lableLeft"
        :show-tab="showTab ? listId === 'all' || listId === 'use' : listId === 'all'"
      >
        <template #header>
          <Tab id="side" icon="i-f7:sidebar-left" :control="true" @choose="openSideBar = true" />
        </template>
        <template #footer>
          <Tab id="search" icon="i-f7:search" :control="true" @choose="showSearch = true" />
        </template>
        <Tab
          id="all"
          :title="t('noteui.allcate')"
        :checked="true"
        :index="0"
          @choose="choose"
          @load="setLab"
        />
        <Tab
          v-if="showTab"
          id="use"
        :title="t('noteui.spcate')"
        :index="1"
          @choose="choose"
          @load="setLab"
        />
      </Tabs>
      <div
        v-if="!isMac() && !systemTitle"
        :bg="
        topState
          ? 'error-d hover:error-h active:error-a'
          : 'black/10 hover:black/20 active:black/30'
        "
        class="fixed left-15px top-14px mr-7px h-13px w-13px flex cursor-pointer items-center justify-center rounded-5px rounded-full p-6px no-drag"
        @click="onTopWindow"
      >
        <div class="i-fluent:pin-12-filled text-13px" :c="topState ? 'white' : '#555'" />
      </div>

      <div v-if="!systemTitle" class="fixed right-15px top-14px z-1">
        <WindowButtons />
      </div>
      <div class="relative w-75vw flex">
        <Transition name="list">
          <component :is="noteComponents[listId as keyof typeof noteComponents]" :key="listId" />
        </Transition>
      </div>
      <div flex="~ gap-10px" class="fixed bottom-15px left-15px no-drag">
        <div
        v-if="listId === 'all' && !autoSync"
        class="flex items-center justify-center p-13px"
          bg="primary-d active:primary-a"
          transition="duration-300 all"
          rounded="10px hover:30px"
        shadow="md hover:lg primary-d/70 dark:primary-a/70"
          transform="active:scale-90 hover:scale-120"
          @click="sync"
        >
          <div
          :class="uid ? 'i-ph:cloud-arrow-down-bold text-22px' : 'i-ph:user-bold text-22px'"
          c="!white"
          />
        </div>
      </div>
      <div flex="~ gap-10px" class="fixed bottom-15px right-15px no-drag">
        <div
        v-if="listId === 'all'"
          class="flex items-center justify-center p-13px"
          bg="primary-d active:primary-a"
          transition="duration-300 all"
          rounded="10px hover:30px"
          shadow="md hover:lg primary-d/70 dark:primary-a/70"
          transform="active:scale-90 hover:scale-120"
        @click="showCateAdd = true"
        >
          <div class="i-ph:plus-bold text-22px c-white" />
        </div>
        <div
        class="flex items-center justify-center p-13px"
          bg="primary-d active:primary-a"
          transition="duration-300 all"
          rounded="10px hover:30px"
        shadow="md hover:lg primary-d/70 dark:primary-a/70"
          transform="active:scale-90 hover:scale-120"
          @click="router.push('/setting')"
        >
          <div class="i-ph:gear-fine-bold text-22px c-white" />
        </div>
      </div>
      <CateAdd :open="showCateAdd" @close="showCateAdd = false" />
      <Search :open="showSearch" @close="showSearch = false" />
    </SettingList>
    <Alert
    :dialog-show="alertShow"
      :title="updateTitle"
      :confirm-btn-name="t('update.gotoUpdate')"
      @cancel="() => (alertShow = false)"
      @return="returnClick"
    >
      <ul class="m-0 p-l-20px">
        <li v-for="(item, index) in alertMsg" :key="index">
        {{ item.slice(2) }}
        </li>
      </ul>
    </Alert>
  `
}

export default NoteUI
