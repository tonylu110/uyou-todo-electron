<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const isDark = usePreferredDark()
const { t } = useI18n()

const mode = ref('normal')

function setMode(setMode: string) {
  mode.value = setMode
  localStorage.setItem('newNoteUI', `${setMode === 'note'}`)
}

function toUse() {
  location.reload()
}
</script>

<template>
  <div
    fixed z-10 h-screen w-screen
    flex items-center justify-center drag
  >
    <div flex="~ col gap-8" items-center no-drag>
      <div flex="~ gap-2">
        <div flex="~ col gap-1" items-center>
          <div
            :bg="mode === 'normal' ? 'primary-d dark:primary-a' : ''"
            border="primary-d dark:primary-a solid 2px"
            h-200px
            w-320px rounded-10px p-2
            @click="setMode('normal')"
          >
            <img
              :src="isDark ? '/color_mode/dark.png' : '/color_mode/light.png'"
              alt="light"
              srcset=""
              h-full w-full rounded-7px
            >
          </div>
          <span>{{ t('mode.normal') }}</span>
        </div>
        <div flex="~ col gap-1" items-center>
          <div
            :bg="mode === 'note' ? 'primary-d dark:primary-a' : ''"
            border="primary-d dark:primary-a solid 2px"
            h-200px
            w-320px rounded-10px p-2
            @click="setMode('note')"
          >
            <img
              :src="isDark ? '/images/note/dark.png' : '/images/note/light.png'"
              alt="dark"
              srcset=""
              h-full w-full rounded-7px
            >
          </div>
          <span>{{ t('mode.note') }}</span>
        </div>
      </div>
      <span c="black/20" mt-4>{{ t('setup.toset') }}</span>
      <button
        bg="primary-d dark:primary-a"
        w-200px rounded-full border-none p-4 c-white outline-none
        @click="toUse"
      >
        {{ t('setup.touse') }}
      </button>
    </div>
  </div>
</template>
