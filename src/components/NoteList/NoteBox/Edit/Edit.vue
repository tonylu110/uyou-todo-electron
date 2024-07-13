<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown as VDropdown } from 'floating-vue'
import { useI18n } from 'vue-i18n'
import Icons from '../../../ListMenu/MenuItem/Icons/Icons.vine'
import Colors from '../../CateAdd/Colors/Color.vue'

const props = defineProps<{
  color: string
  icon: string
  name: string
}>()

const emits = defineEmits<{
  edit: [name: string, icon: string, color: string | null]
}>()

const { t } = useI18n()

const isOpen = ref(false)

const cateName = ref(props.name)
const useColor = ref<string | null>(props.color)
const useIcon = ref(props.icon)

const isVip = ref(localStorage.getItem('isVip') === 'true')
const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')
</script>

<template>
  <VDropdown
    v-model:shown="isOpen"
    :distance="12"
    placement="top"
  >
    <div @click="isOpen = true">
      <div i-ph:pencil-bold block />
    </div>
    <template #popper>
      <div
        flex="~ col"
        w-300px items-center justify-between no-drag
      >
        <div flex="~ 1 col" w="[calc(100%-20px)]" p="x-10px y-17px">
          <span m="l-7px b-5px" font-bold>{{ t('noteui.chooseIcon') }}</span>
          <Icons
            max-w="![calc(100%-20px)]"
            :icon="useIcon"
            @set-icon="(newIcon: string) => useIcon = newIcon"
          />
          <span m="l-7px b-5px t-5px" font-bold>{{ t('noteui.cateName') }}</span>
          <input
            v-model="cateName"
            type="text" w="[calc(100%-25px)]" m="l-7px t-5px"
            rounded-7px border-none p-5px outline-primary-d
            bg="black/5"
          >
          <template v-if="isVip && useCustColor">
            <span m="l-7px b-7px t-7px" font-bold>{{ t('noteui.chooseColor') }}</span>
            <Colors :color="useColor" @set-color="(selectColor: string | null) => useColor = selectColor" />
          </template>
        </div>
        <div flex="~ gap-3" w="[calc(100%-28px)]" p="x-3 b-3" no-drag>
          <button
            flex-1 rounded-5px p-y-5px outline-none no-drag
            c="dark:#111 #fff" border="2px solid primary-d dark:primary-a"
            shadow="sm black/30 active:none"
            bg="primary-d/90 dark:primary-a/90 active:primary-d active:dark:primary-a"
            @click="() => {
              emits('edit', cateName, useIcon, useColor)
              isOpen = false
            }"
          >
            {{ t('alertText.returnText') }}
          </button>
          <button
            flex-1 rounded-5px p-y-5px outline-none no-drag
            c="dark:#111 #fff" border="2px solid error-d dark:error-a"
            shadow="sm black/30 active:none"
            bg="error-d/90 dark:error-a/90 active:error-d dark:active:error-a"
            @click="isOpen = false"
          >
            {{ t('alertText.cancelText') }}
          </button>
        </div>
      </div>
    </template>
  </VDropdown>
</template>
