<template>
  <router-url v-if="routerShow" />
  <router-view name="isWindow"></router-view>
  <div class="app-main" v-if="!isWinDow">
    <title-bar/>
    <div class="app-list" :style="{height: titleBarShow ? '100vh' : ''}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "./components/TitleBar/TitleBar.vue";
import { useRoute, useRouter } from "vue-router";
import { onBeforeUnmount, ref } from "vue";
import RouterUrl from "./components/RouterUrl";
import emitter from "./util/bus";
import isDev from "./util/mode";

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
</script>

<style scoped lang="scss">
.app-list {
  width: 100vw;
  height: calc(100vh - 41px);
  overflow: hidden;
}
</style>