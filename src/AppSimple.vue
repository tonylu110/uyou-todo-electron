<template>
  <router-url v-if="routerShow" />
  <router-view name="isWindow"></router-view>
  <div v-if="!isWinDow">
    <title-bar/>
    <div 
      w-screen overflow-hidden
      :h="titleBarShow ? 'screen' : '[calc(100vh-41px)]'"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "./components/TitleBar/TitleBar.vue";
import { useRoute, useRouter } from "vue-router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import RouterUrl from "./components/RouterUrl";
import emitter from "./util/bus";
import isDev from "./util/mode";
import getCateList from "./util/getCateList";

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