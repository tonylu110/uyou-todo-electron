<script setup lang="ts">
import { useRouter } from 'vue-router'
import WindowButtons from '../components/TabBar/windowButtons'
import SettingList from '../components/SettingList'
import NoteList from '../components/NoteList/NoteList.vue'

const router = useRouter()
</script>

<template>
  <SettingList h="![calc(100vh-160px)]" p-y="!80px" drag>
    <div fixed right-15px top-14px>
      <WindowButtons />
    </div>

    <NoteList />

    <div

      flex="~ gap-10px" fixed bottom-15px right-15px no-drag
    >
      <div

        bg="primary-d active:primary-a"
        transition="duration-300 all"
        rounded="10px hover:30px"
        shadow="md" flex items-center justify-center p-13px active:transform-scale-90
      >
        <div i-ph:plus-bold text-22px c-white />
      </div>
      <div

        bg="primary-d active:primary-a"
        transition="duration-300 all"
        rounded="10px hover:30px"
        shadow="md" flex items-center justify-center p-13px active:transform-scale-90
        @click="router.push('/setting')"
      >
        <div i-ph:gear-fine-bold text-22px c-white />
      </div>
    </div>
  </SettingList>
</template>
