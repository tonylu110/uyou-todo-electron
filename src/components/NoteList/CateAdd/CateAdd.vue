<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCateStore } from '../../../store/cateStore'
import Alert from '../../Alert/Alert.vue'
import Icons from '../../ListMenu/MenuItem/Icons/Icons.vine'
import Colors from './Colors/Color.vue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()
const cateStore = useCateStore()

const cateName = ref('')
const icon = ref('i-ph:radio-button-bold')
const color = ref<string | null>(null)

async function addCate() {
  if (!cateName.value)
    return

  await cateStore.addCategory({
    title: cateName.value,
    icon: icon.value,
    color: color.value,
  })

  emit('close')
  resetForm()
}

const isVip = ref(localStorage.getItem('isVip') === 'true')
const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')

function resetForm() {
  cateName.value = ''
  icon.value = 'i-ph:radio-button-bold'
  color.value = null
}

function close() {
  emit('close')
  resetForm()
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
        <span m="l-7px b-5px" font-bold>{{ t('noteui.chooseIcon') }}</span>
        <Icons
          max-w="![calc(100%-20px)]"
          :icon="icon"
          @set-icon="(newIcon: string) => icon = newIcon"
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
          <Colors :color="color" @set-color="(selectColor: string | null) => color = selectColor" />
        </template>
      </div>
    </div>
  </Alert>
</template>

<style lang="scss" scoped>
@keyframes show {
  from {
    transform: translate(100%, 100%) scale(0, 0);
    opacity: 0;
  }
  to {
    transform: translate(0) scale(1, 1);
    opacity: 1;
  }
}

@keyframes hide {
  to {
    transform: translate(100%, 100%) scale(0, 0);
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
  transform-origin: bottom right;

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
