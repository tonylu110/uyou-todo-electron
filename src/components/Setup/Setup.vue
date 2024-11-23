<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const isDark = usePreferredDark()
const { t } = useI18n()

const mode = ref('note')
localStorage.setItem('newNoteUI', 'true')

function setMode(setMode: string) {
  mode.value = setMode
  localStorage.setItem('newNoteUI', `${setMode === 'note'}`)
}

function toUse() {
  if (mode.value === 'normal') {
    localStorage.setItem('newNoteUI', 'false')
  }
  location.reload()
}
</script>

<template>
  <div
    fixed z-10 h-screen w-screen
    flex items-center justify-center drag
    bg="white/30 dark:#333/30"
  >
    <div flex="~ col gap-16" items-center no-drag>
      <div flex="~ gap-4">
        <div flex="~ col gap-2" items-center>
          <div
            :bg="mode === 'normal' ? 'primary-d dark:primary-a' : ''"
            :border="`${mode === 'normal' ? 'primary-d dark:primary-a' : 'black/10'} solid 2px`"
            h-200px transition="all duration-300"
            w-320px rounded-10px p-2
            @click="setMode('normal')"
          >
            <img
              :src="isDark ? './color_mode/dark.png' : './color_mode/light.png'"
              alt="light"
              srcset=""
              h-full w-full rounded-6px
            >
          </div>
          <span>{{ t('mode.normal') }}</span>
        </div>
        <div flex="~ col gap-2" items-center>
          <div
            :bg="mode === 'note' ? 'primary-d dark:primary-a' : ''"
            :border="`${mode === 'note' ? 'primary-d dark:primary-a' : 'black/10'} solid 2px`"
            h-200px transition="all duration-300"
            w-320px rounded-10px p-2
            @click="setMode('note')"
          >
            <img
              :src="isDark ? './images/note/dark.png' : './images/note/light.png'"
              alt="dark"
              srcset=""
              h-full w-full rounded-6px
            >
          </div>
          <span>{{ t('mode.note') }}</span>
        </div>
      </div>
      <button
        bg="primary-d dark:primary-a active:primary-a dark:active:primary-d"
        w-auto rounded-full border-none p="y-4 x-10 hover:x-4" c-white font-bold outline-none
        shadow="hover:primary-a/50 hover:md active:none"
        scale="hover:150 active:80" transition="all duration-300"
        class="group"
        @click="toUse"
      >
        <div i-ph:arrow-right-bold hidden text-5 group-hover:block />
        <span text-4 line-height-5 group-hover:hidden>{{ t('setup.touse') }}</span>
      </button>
    </div>
    <span fixed bottom-6 c="black/30">{{ t('setup.toset') }}</span>
  </div>
</template>
