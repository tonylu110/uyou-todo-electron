<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import emitter from '../../../util/bus'

const { t } = useI18n()

const showToday = ref(false)

const todayShow = ref(localStorage.getItem('todayShow'))

function changeTodayshow(show: string) {
  todayShow.value = show
  localStorage.setItem('todayShow', todayShow.value!)
  emitter.emit('todayShow', todayShow.value)
  showToday.value = false
}
</script>

<template>
  <VDropdown
    v-model:shown="showToday"
    :distance="12"
    placement="bottom"
  >
    <div
      bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
      w-20px cursor-pointer rounded-5px p-5px no-drag
      @click="showToday = true"
    >
      <div c="#555 dark:#bbb" i-ph:clock-bold block text-20px />
    </div>
    <template #popper>
      <div flex="~ wrap col">
        <div
          class="group"
          flex items-center p-3
          border-b="1px solid #ddd dark:#333"
          bg="hover:black/5 active:primary-d"
          @click="changeTodayshow('null')"
        >
          <div
            i-ph:check-bold mr-3 c-primary-d
            :opacity="todayShow === null || todayShow === 'null' ? '100' : '0'"
          />
          <span select-none group-active:c-white>{{ t('todayShow.creatTime') }}</span>
        </div>
        <div
          class="group"
          flex items-center p-3
          border-b="1px solid #ddd dark:#333"
          bg="hover:black/5 active:primary-d"
          @click="changeTodayshow('todayRemind')"
        >
          <div
            i-ph:check-bold mr-3 c-primary-d
            :opacity="todayShow === 'todayRemind' ? '100' : '0'"
          />
          <span select-none group-active:c-white>{{ t('todayShow.remindTime') }}</span>
        </div>
        <div
          class="group"
          flex items-center p-3
          bg="hover:black/5 active:primary-d"
          @click="changeTodayshow('allAboutToday')"
        >
          <div
            i-ph:check-bold mr-3 c-primary-d
            :opacity="todayShow === 'allAboutToday' ? '100' : '0'"
          />
          <span select-none group-active:c-white>{{ t('todayShow.allTime') }}</span>
        </div>
      </div>
    </template>
  </VDropdown>
</template>
