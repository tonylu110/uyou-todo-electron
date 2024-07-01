<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { cateItem } from '../../../../ListMenu/ICateItem'

const props = defineProps<{
  title: string
  cateId: string | number
}>()

const emits = defineEmits<{
  edit: [title: string, cateId: string | number]
}>()

const { t } = useI18n()

const isOpen = ref(false)

const text = ref(props.title)
const useCateId = ref(props.cateId)

const localCateList = localStorage.getItem('cate')
const cateList = ref<cateItem[]>(JSON.parse(localCateList!).data)

watch(isOpen, () => {
  cateList.value = JSON.parse(localStorage.getItem('cate')!).data
})
</script>

<template>
  <VDropdown
    v-model:shown="isOpen"
    :distance="12"
    placement="top"
  >
    <div
      bg="primary-d active:primary-a" transition="all 300"
      w-16px flex items-center justify-center rounded-7px p-6px
      @click="isOpen = true"
    >
      <div i-ph:pencil-bold c-white />
    </div>
    <template #popper>
      <div
        flex="~ col"
        w-300px items-center justify-between no-drag
      >
        <div flex="~ col gap-2" w-261px items-center p-3>
          <input
            v-model="text" type="text"
            w-full rounded-7px border-none p-5px outline-primary-d
            bg="black/5"
          >
          <div flex="~ gap-2 wrap" w-268px items-start justify-start>
            <span text-13px font-bold>{{ t('note.select') }}</span>
            <div flex="~ gap-2 wrap">
              <div
                v-for="item in cateList"
                :key="item.id"
                bg="black/5 active:black/10" p="x-4 y-2"
                flex select-none items-center
                rounded-full text-13px
                @click="useCateId = item.id"
              >
                <div v-if="item.id === useCateId" i-mdi:check-bold mr-1 />
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
        <div flex="~ gap-3" w="[calc(100%-28px)]" p="x-3 b-3" no-drag>
          <button
            flex-1 rounded-5px p-y-5px outline-none no-drag
            c="dark:#111 #fff" border="2px solid primary-d dark:primary-a"
            shadow="sm black/30 active:none"
            bg="primary-d/90 dark:primary-a/90 active:primary-d active:dark:primary-a"
            @click="() => {
              emits('edit', text, useCateId)
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
