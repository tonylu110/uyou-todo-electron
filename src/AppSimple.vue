<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import TitleBar from './components/TitleBar/TitleBar.vue'
import RouterUrl from './components/RouterUrl'
import emitter from './util/bus'
import isDev from './util/mode'
import getCateList from './util/getCateList'

const titleBarShow = localStorage.getItem('systemTitle') === 'true'

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

onMounted(() => {
  setTimeout(() => {
    getCateList()
  }, 0)
})
</script>

<template>
  <RouterUrl v-if="routerShow" />
  <router-view name="isWindow" />
  <div v-if="!isWinDow">
    <TitleBar />
    <div
      overflow-hidden w="[calc(100vw-20px)]" ml-10px rounded-7px mt-5px
      :h="titleBarShow ? '[calc(100vh-15px)]' : '[calc(100vh-55px)]'" border="1px solid black/10"
    >
      <router-view />
    </div>
  </div>
</template>
