<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { watchDebounced } from '@vueuse/core'
import type ITodoList from '../../interface/ITodoListArray'
import LocalStorage from '../../util/localStorage'
import emitter from '../../util/bus'
import Item from './Item/Item.vue'

const props = defineProps<{
  open: boolean
}>()

const emits = defineEmits<{
  close: []
}>()

const dialog = ref<HTMLDialogElement>()

const searchValue = ref('')

const listData = ref<ITodoList[]>([])
const loaclList = ref(LocalStorage('get') as ITodoList[])

watchDebounced(searchValue, (newValue) => {
  if (newValue.length > 0) {
    const regex = new RegExp(newValue, 'i')
    listData.value = loaclList.value.filter(item => regex.test(item.text))
  }
  else {
    listData.value = []
  }
}, { debounce: 300 })

function close() {
  emits('close')
}

onMounted(() => {
  const closeAlert = () => {
    dialog.value!.close()
    listData.value = []
    searchValue.value = ''
  }

  watchEffect(() => {
    if (props.open) {
      dialog.value!.removeEventListener('animationend', closeAlert)
      dialog.value!.showModal()
      loaclList.value = LocalStorage('get') as ITodoList[]
    }
    else {
      dialog.value!.addEventListener('animationend', closeAlert)
    }
  })
})

function setOk(id: number, ok: boolean) {
  for (let i = 0; i < listData.value!.length; i++) {
    if (listData.value![i].id === id)
      listData.value![i].ok = ok
  }
  emitter.emit('searchSetOk', { id, ok })
}

function deleteItem(id: number) {
  for (let i = 0; i < listData.value!.length; i++) {
    if (listData.value![i].id === id)
      listData.value!.splice(i, 1)
  }
  emitter.emit('searchDelete', id)
}

function setStar(id: number, star: boolean) {
  for (let i = 0; i < listData.value!.length; i++) {
    if (listData.value![i].id === id)
      listData.value![i].star = star
  }
  emitter.emit('searchSetStar', { id, star })
}
</script>

<template>
  <dialog
    ref="dialog"
    :class="`alert ${open ? '' : 'hide'}`"
    border-none bg-transparent outline-none no-drag
  >
    <div flex="~ col gap10px">
      <div flex items-center>
        <input
          v-model="searchValue"
          type="text"
          bg="white dark:#333"
          mr-10px w-500px rounded-7px border-none p-20px text-5 shadow-lg outline-none
        >
        <button
          bg="error-d dark:error-a active:error-a active:dark:error-h" shadow="lg error-a/70"
          rounded="7px" h-66px w-45px flex items-center justify-center border-none outline-none
          @click="close"
        >
          <div i-ph:x-bold block text-6 c-white />
        </button>
      </div>
      <PerfectScrollbar
        bg="white dark:#333" rounded-7px
        max-h="[calc(100vh-250px)]" shadow-lg
      >
        <div v-if="listData.length > 0" flex="~ col" items-center p="y-10px x-5px">
          <Item
            v-for="item, index in listData"
            :id="item.id"
            :key="item.id"
            :border="listData.length !== index + 1 ? 'b-black/5 b-solid b-2px' : 'none'"
            :text="item.text"
            :ok="item.ok"
            :star="item.star"
            @set-ok="setOk"
            @delete="deleteItem"
            @set-star="setStar"
          />
        </div>
      </PerfectScrollbar>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
@import '../Alert/dialogAnimation.scss';

.alert {
  --uno: overflow-hidden select-none;
}

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
</style>
