<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onLongPress } from '@vueuse/core'
import { createToast } from '../../components/Toast'
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
  if (inPass.value === openPass.value) { model.value = false }
  else {
    createToast({
      msg: t('openPass.passErr'),
      center: true,
    })
  }
}

const backSpaceRef = ref()

onLongPress(
  backSpaceRef,
  () => {
    inPass.value = ''
  },
  {
    modifiers: {
      prevent: true,
    },
  },
)
</script>

<template>
  <div

    fixed left-0 top-0 z-1000 h-screen w-screen flex items-center justify-center drag
  >
    <div no-drag>
      <div relative w-190px>
        <input
          v-focus
          v-model="inPass"
          type="password"
          p="x-10px y-20px" w-full rounded-7px border-none text-center shadow-md
          outline-primary-d
          bg="white/50 dark:#666/50"
          @keydown.enter="ok"
        >
        <div
          v-if="inPass"
          ref="backSpaceRef"
          v-tooltip.top-end="{
            content: t('openPass.longPress'),
            distance: 12,
          }"
          right="[calc(-1rem-70px)]"
          bg="gray/50 active:gray"

          absolute top-0 h-1rem flex items-center justify-center rounded-7px p-20px shadow-md no-drag
          @click="backSpace"
        >
          <div i-ph:backspace-bold />
        </div>
      </div>
      <nums @num-click="numClick" @ok="ok" />
    </div>
  </div>
</template>
