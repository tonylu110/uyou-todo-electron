<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const showToday = ref(false)
</script>

<template>
  <VDropdown
    v-model:shown="showToday"
    :distance="12"
    placement="bottom"
  >
    <div
      bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
      p-5px w-20px rounded-5px no-drag cursor-pointer
      @click="showToday = true"
    >
      <div i-ph:clock-bold text-20px c="#555 dark:#bbb" block />
    </div>
    <template #popper>
      <div flex="~ wrap col">
        <div
          class="group"
          flex items-center p-3
          border-b="1px solid #ddd dark:#333"
          bg="hover:black/5 active:primary-d"
        >
          <div i-ph:check-bold c-primary-d mr-3/>
          <span select-none group-active:c-white>{{ t('todayShow.creatTime') }}</span>
        </div>
        <div
          class="group"
          flex items-center p-3 
          border-b="1px solid #ddd dark:#333"
          bg="hover:black/5 active:primary-d"
        >
          <div i-ph:check-bold c-primary-d mr-3/>
          <span select-none group-active:c-white>{{ t('todayShow.remindTime') }}</span>
        </div>
        <div
          class="group"
          flex items-center p-3
          bg="hover:black/5 active:primary-d"
        >
          <div i-ph:check-bold c-primary-d mr-3/>
          <span select-none group-active:c-white>{{ t('todayShow.allTime') }}</span>
        </div>
      </div>
    </template>
  </VDropdown>
</template>