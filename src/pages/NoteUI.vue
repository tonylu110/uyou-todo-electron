<script setup lang="ts">
import { useRouter } from 'vue-router';
import WindowButtons from '../components/TabBar/windowButtons';
import SettingList from '../components/SettingList';

const router = useRouter()
</script>

<template>
  <SettingList h="!screen" pt="!0" drag>
    <div fixed top-14px right-15px>
      <WindowButtons />
    </div>

    <div 
      fixed right-15px bottom-15px 
      flex="~ gap-10px" no-drag
    >
      <div 
        flex justify-center items-center
        p-15px bg="primary-d active:primary-a" 
        transition="duration-300 border-radius"
        rounded="10px hover:30px"
        shadow="md"
      >
        <div i-ph:plus-bold text-24px c-white />
      </div>
      <div 
        flex justify-center items-center
        p-15px bg="primary-d active:primary-a" 
        transition="duration-300 border-radius"
        rounded="10px hover:30px"
        shadow="md"
        @click="router.push('/setting')"
      >
        <div i-ph:gear-fine-bold text-24px c-white/>
      </div>
    </div>
  </SettingList>
</template>