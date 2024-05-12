<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Icons from '../../ListMenu/MenuItem/Icons'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const dialog = ref<HTMLDialogElement>()

function openDialog(open: boolean) {
  const closeAlert = () => {
    dialog.value!.close()
  }

  if (open) {
    // dialog.value!.removeEventListener('animationend', closeAlert)
    dialog.value!.showModal()
  }
  else {
    // dialog.value!.addEventListener('animationend', closeAlert)
    closeAlert()
  }
}

onMounted(() => {
  openDialog(props.open)

  watch(props, (newValue) => {
    openDialog(newValue.open)
  })
})

const cateName = defineModel<string>()

const isVip = ref(localStorage.getItem('isVip') === 'true')
const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')
</script>

<template>
  <dialog
    ref="dialog"
    :class="`dialog ${open ? '' : 'hide'}`"
    rounded-10px border-none p-0 outline-none shadow-item
  >
    <div
      flex="~ col"
      w-300px items-center justify-between no-drag
    >
      <div flex="~ 1 col" w="[calc(100%-20px)]" p="x-10px y-17px">
        <span m="l-7px b-5px" font-bold>Choose category icon</span>
        <Icons max-w="![calc(100%-20px)]" />
        <span m="l-7px b-5px t-5px" font-bold>Category name</span>
        <input
          v-model="cateName"
          type="text" w="[calc(100%-30px)]" m="l-7px t-5px"
          rounded-7px border-none p-5px outline-primary-d
          bg="black/5"
        >
        <template v-if="isVip && useCustColor">
          <span m="l-7px b-5px t-5px" font-bold>Choose category color</span>
        </template>
      </div>
      <div w-full flex>
        <button
          bg="primary-d/70 active:primary-d/90"
          h-50px flex-1 select-none rounded-bl-10px
          border-none c-white outline-none no-drag
          @click="emit('close')"
        >
          Confirm
        </button>
        <button
          bg="error-d/70 active:error-d/90"
          h-50px flex-1 select-none rounded-br-10px
          border-none c-white outline-none no-drag
          @click="emit('close')"
        >
          close
        </button>
      </div>
    </div>
  </dialog>
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
