<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CheckBox from '../../../List/Item/CheckBox/CheckBox.vue'
import { createToast } from '../../../Toast'

const props = defineProps<{
  title: string
  id: number
  isOk: boolean
  color?: string | null
}>()

const emits = defineEmits<{
  del: [id: number]
  setOk: [id: number, ok: boolean]
}>()

const { t } = useI18n()

const okState = ref(props.isOk)

watch(okState, (newValue) => {
  emits('setOk', props.id, newValue)
})

const itemDom = ref()
function copy() {
  navigator.clipboard.writeText(props.title!).then(() => {
    createToast({ msg: t('copyToast'), center: true }, itemDom.value)
  })
}
</script>

<template>
  <div ref="itemDom" relative flex items-center justify-between p-5px>
    <CheckBox v-model="okState" left="4px!" :num="id" :color="color ? color : 'primary-d'" />
    <div
      ml-30px
      :line="okState ? 'through' : ''"
      :c="okState
        ? '#333/25 dark:#bbb/25 selection:white'
        : '#333 dark:#bbb selection:white'"
    >
      {{ title }}
    </div>
    <div
      flex="~ gap-5px"
      absolute right--10px overflow-hidden pr-10px
      w="15px hover:95px" transition="all 300"
      opacity="0 hover:100"
    >
      <div
        bg="success-d active:success-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
        @click="copy"
      >
        <div i-ph:copy-bold c-white />
      </div>
      <div
        bg="primary-d active:primary-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
      >
        <div i-ph:pencil-bold c-white />
      </div>
      <div
        bg="error-d active:error-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
        @click="emits('del', id)"
      >
        <div i-ph:trash-bold c-white />
      </div>
    </div>
  </div>
</template>
