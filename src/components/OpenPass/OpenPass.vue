<script setup lang="ts">
import { ref } from 'vue';
import { closeWindow } from '../../util/windowApi'
import { useI18n } from 'vue-i18n'
import { createToast } from '../../components/Toast'

const { t } = useI18n()

const inPass = ref('')

function numClick(num: string) {
  inPass.value = inPass.value + num
}

function backSpace() {
  inPass.value = inPass.value.substring(0, inPass.value.length - 1)
}

const model = defineModel<boolean>()
const useOpenPass = ref(localStorage.getItem('useOpenPass') === 'true')
const openPass = ref(localStorage.getItem('openPass') ? localStorage.getItem('openPass') : '')
function ok() {
  if(inPass.value === openPass.value)
    model.value = false
  else
    createToast({ msg: t('openPass.passErr') })
}
</script>

<template>
  <div 
    z-1000 backdrop-blur-md w-screen h-screen
    fixed top-0 left-0
    flex justify-center items-center
  >
    <div>
      <div relative w-190px>
        <input
          v-focus
          type="password"
          p="x-10px y-20px" rounded-7px outline-primary-d 
          text-center border-none w-full
          bg="white/50 dark:#666/50"
          v-model="inPass"
          @keydown.enter="ok"
        >
        <div 
          v-if="inPass"
          absolute right="[calc(-1rem-70px)]" top-0 p-20px
          h-1rem bg="gray/50 active:gray"
          flex justify-center items-center
          rounded-7px
          @click="backSpace"
        >
          <div i-ph:backspace-bold/>
        </div>
      </div>
      <div 
        grid w-210px grid-cols-3 grid-rows-4 gap-9px
        mt-10px
      >
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('1')"
        >
          1
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('2')"
        >
          2
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('3')"
        >
          3
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('4')"
        >
          4
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('5')"
        >
          5
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('6')"
        >
          6
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('7')"
        >
          7
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('8')"
        >
          8
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('9')"
        >
          9
        </div>
        <div 
          flex justify-center items-center
          bg="error-d/50 active:error-d" h-64px rounded-7px
          @click="closeWindow(void 0, true)"
        >
          <div i-ph:x-bold/>
        </div>
        <div 
          flex justify-center items-center
          bg="gray/50 active:gray" h-64px rounded-7px
          @click="numClick('0')"
        >
          0
        </div>
        <div 
          flex justify-center items-center
          bg="primary-d/50 active:primary-d" h-64px rounded-7px
          @click="ok"
        >
          <div i-ph:check-bold/>
        </div>
      </div>
    </div>
  </div>
</template>