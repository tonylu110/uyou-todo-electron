<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import Alert from '../../Alert/Alert.vue'

defineProps<{
  open: boolean
}>()

const emits = defineEmits<{
  close: []
  add: [time: string]
}>()

const model = defineModel<string>()

const { t } = useI18n()

const useTime = ref('')

function close() {
  emits('close')
}

function addItem() {
  emits('add', useTime.value)
}
</script>

<template>
  <Alert
    :show-title="false"
    :dialog-show="open"
    :confirm-btn-name="t('noteui.addItem')"
    :cancel-btn-name="t('noteui.cancelAdd')"
    @cancel="close"
    @return="addItem"
  >
    <input
      v-model="model"
      type="text" w="[calc(100%-25px)]" m="l-7px t-5px"
      rounded-7px border-none p-5px outline-primary-d
      bg="black/5"
    >
  </Alert>
</template>
