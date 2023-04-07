<template>
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
import { ref } from "vue";

const titleBarShow = localStorage.getItem('systemTitle') === 'true'

const route = useRoute()
const router = useRouter()
const isWinDow = ref(true)

router.isReady().then(() => {
  isWinDow.value = route.query.isWin === 'true'
})
</script>

<style scoped lang="scss">
.app-list {
  width: 100vw;
  height: calc(100vh - 41px);
  overflow: hidden;
}
</style>