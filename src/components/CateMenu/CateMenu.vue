<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { cateItem } from '../ListMenu/ICateItem'
import emitter from '../../util/bus'
import Alert from '../Alert/Alert.vue'
import changeCate from '../ListMenu/changCate'
import type ITodoList from '../../interface/ITodoListArray'
import LocalStorage from '../../util/localStorage'
import saveItemSet from '../List/saveItemSet'
import MenuItem from './MenuItem.vue'

const emits = defineEmits<{
  (e: 'clickMenu'): void
}>()

const { t } = useI18n()

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)

emitter.on('setCate', (data) => {
  cateList.length = 0
  JSON.parse((data as string)).data.forEach((item: cateItem) => {
    cateList.push(item)
  })
})

const router = useRouter()
function toList(listName: string) {
  router.push({
    path: '/other',
    query: {
      listName,
    },
  })
}

const dialogShow = ref(false)
const cateText = ref('')
function addCate() {
  cateList.push({
    id: new Date().getTime(),
    title: cateText.value,
  })
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  emitter.emit('setCate', JSON.stringify({
    data: cateList,
  }))
  if (localStorage.getItem('uid')) {
    changeCate({
      uid: localStorage.getItem('uid')!,
      data: {
        data: cateList,
      },
    })
  }
  dialogShow.value = false
  cateText.value = ''
}
function delCate(id: number) {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === id)
      cateList.splice(i, 1)
  }
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  emitter.emit('setCate', JSON.stringify({
    data: cateList,
  }))
  if (localStorage.getItem('uid')) {
    changeCate({
      uid: localStorage.getItem('uid')!,
      data: {
        data: cateList,
      },
    })
  }
}

function editItem(id: number, title: string) {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === id)
      cateList[i].title = title
  }
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  emitter.emit('setCate', JSON.stringify({
    data: cateList,
  }))
  if (localStorage.getItem('uid')) {
    changeCate({
      uid: localStorage.getItem('uid')!,
      data: {
        data: cateList,
      },
    })
  }
}

function delWithToDo(id: number) {
  const listAll = ref<ITodoList[]>(LocalStorage('get')!)

  const resultArr = listAll.value.filter((value) => {
    return value.cate !== `${id}`
  })

  saveItemSet(resultArr)

  delCate(id)
}
</script>

<template>
  <div class="list" fixed top-95px z-2>
    <PerfectScrollbar

      bg="white/50 dark:#333/70"
      flex="~ col"
      c="#555 dark:#bbb" z-2 h-auto w-screen cursor-pointer items-center overflow-y-scroll rounded-b-10px p-y-10px font-bold backdrop-blur-7px shadow-item
      @click="emits('clickMenu')"
    >
      <div

        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" p-10px text-center text-18px
        @click="toList('today')"
      >
        {{ t('startPage.today') }}
      </div>
      <div

        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" p-10px text-center text-18px
        @click="toList('star')"
      >
        {{ t('listMenu.star') }}
      </div>
      <div

        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" p-10px text-center text-18px
        @click="router.push('/')"
      >
        {{ t('listMenu.allTodo') }}
      </div>
      <div

        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" p-10px text-center text-18px
        @click="toList('allDo')"
      >
        {{ t('listMenu.completed') }}
      </div>
      <div

        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" p-10px text-center text-18px
        @click="toList('allNotDo')"
      >
        {{ t('listMenu.incompleted') }}
      </div>
      <MenuItem
        v-for="cate in cateList"
        :id="cate.id"
        :key="cate.id"
        :title="cate.title"
        @del-item="delCate"
        @edit-item="editItem"
        @del-with-to-do="delWithToDo"
      />
      <div

        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]"
        flex items-center justify-center p-10px text-18px
        @click.stop="dialogShow = true"
      >
        <div i-ph:plus-circle-bold text-20px />
      </div>
    </PerfectScrollbar>
  </div>
  <div
    class="black"

    fixed z-1 h-screen w-screen rounded-7px bg-black
  />
  <Alert
    :title="t('add-category')"
    :dialog-show="dialogShow"
    @cancel="dialogShow = false"
    @return="addCate"
  >
    <input
      v-model="cateText"
      type="text"
      bg="black/10 dark:#999/10" c="#555 dark:#bbb"
      outline="primary-d dark:primary-a"
      rounded-5px border-none p-10px
    >
  </Alert>
</template>

<style scoped>
@keyframes showList {
  0% {
    grid-template-rows: 0fr;
  }
  100% {
    grid-template-rows: 1fr;
  }
}

@keyframes back {
  from {
    background-color: transparent;
  }
  to {
    background-color: #00000030;
  }
}

.list {
  display: grid;
  grid-template-rows: 0fr;
  animation: showList 0.3s forwards;
}

.black {
  animation: back 0.3s forwards;
}
</style>
