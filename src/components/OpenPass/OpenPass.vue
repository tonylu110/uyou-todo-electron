<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { createToast } from '../../components/Toast'
import { onLongPress } from '@vueuse/core'
import nums from './nums.vue'

const { t } = useI18n()

const inPass = ref('')

function numClick(num: string) {
  inPass.value = inPass.value + num
}

function backSpace() {
  inPass.value = inPass.value.substring(0, inPass.value.length - 1)
}

const model = defineModel<boolean>()
const openPass = ref(localStorage.getItem('openPass') ? localStorage.getItem('openPass') : '')
function ok() {
  if(inPass.value === openPass.value)
    model.value = false
  else
    createToast({
      msg: t('openPass.passErr'),
      center: true
    })
}

const backSpaceRef = ref()

onLongPress(
  backSpaceRef,
  () => {
    inPass.value = ''
  },
  {
    modifiers: {
      prevent: true
    }
  }
)
</script>

<template>
  <div 
    z-1000 w-screen h-screen
    fixed top-0 left-0 drag
    flex justify-center items-center
  >
    <div no-drag>
      <div relative w-190px>
        <input
          v-focus
          type="password"
          p="x-10px y-20px" rounded-7px outline-primary-d 
          text-center border-none w-full shadow-md
          bg="white/50 dark:#666/50"
          v-model="inPass"
          @keydown.enter="ok"
        >
        <div
          v-if="inPass"
          v-tooltip.top-end="{
            content: t('openPass.longPress'),
            distance: 12
          }"
          ref="backSpaceRef"
          absolute right="[calc(-1rem-70px)]" top-0 p-20px
          h-1rem bg="gray/50 active:gray"
          flex justify-center items-center
          rounded-7px shadow-md no-drag
          @click="backSpace"
        >
          <div i-ph:backspace-bold/>
        </div>
      </div>
      <nums @num-click="numClick" @ok="ok"/>
    </div>
  </div>
</template>