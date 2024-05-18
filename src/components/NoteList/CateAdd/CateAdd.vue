<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Icons from '../../ListMenu/MenuItem/Icons'
import Alert from '../../Alert/Alert.vue'
import emitter from '../../../util/bus'
import Colors from './Colors/Color.vue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

const cateName = ref('')
const icon = ref('i-ph:radio-button-bold')
const color = ref('null')

function addCate() {
  emitter.emit('addCateNote', {
    name: cateName.value,
    icon: icon.value,
    color: color.value,
  })
  emit('close')
  cateName.value = ''
  icon.value = 'i-ph:radio-button-bold'
  color.value = 'null'
}

const isVip = ref(localStorage.getItem('isVip') === 'true')
const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')

function close() {
  emit('close')
  cateName.value = ''
  icon.value = 'i-ph:radio-button-bold'
  color.value = 'null'
}
</script>

<template>
  <Alert
    body-padding="0"
    :show-title="false"
    :dialog-show="open"
    :confirm-btn-name="t('noteui.addCate')"
    :cancel-btn-name="t('noteui.cancelAdd')"
    @cancel="close"
    @return="addCate"
  >
    <div
      flex="~ col"
      w-300px items-center justify-between no-drag
    >
      <div flex="~ 1 col" w="[calc(100%-20px)]" p="x-10px y-17px">
        <span m="l-7px b-5px" font-bold>Choose category icon</span>
        <Icons
          max-w="![calc(100%-20px)]"
          :icon="icon"
          @set-icon="(newIcon) => icon = newIcon"
        />
        <span m="l-7px b-5px t-5px" font-bold>Category name</span>
        <input
          v-model="cateName"
          type="text" w="[calc(100%-30px)]" m="l-7px t-5px"
          rounded-7px border-none p-5px outline-primary-d
          bg="black/5"
        >
        <template v-if="isVip && useCustColor">
          <span m="l-7px b-5px t-5px" font-bold>Choose category color</span>
          <Colors :color="color" @set-color="(selectColor: string) => color = selectColor" />
        </template>
      </div>
    </div>
  </Alert>
</template>

<style lang="scss" scoped>
@keyframes show {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes hide {
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

@keyframes showDialogBackdrop {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.2);
  }
}

@keyframes hideDialogBackdrop {
  to {
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
  }
}

dialog {
  &[open] {
    animation: show 0.3s ease normal;

    &::backdrop {
      animation: showDialogBackdrop 0.3s forwards;
    }

    &.hide {
      &::backdrop {
        animation: hideDialogBackdrop 0.3s;
      }
    }
  }

  &.hide {
    animation: hide 0.3s ease normal;
  }
}
</style>
