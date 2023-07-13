<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { cateItem } from '../ListMenu/ICateItem'
import emitter from '../../util/bus'

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
</script>

<template>
  <div class="list" top-95px fixed z-2>
    <PerfectScrollbar
      z-2 cursor-pointer overflow-y-scroll
      bg="white/50 dark:#333/70" w-screen p-y-10px h-auto
      flex="~ col" items-center backdrop-blur-7px
      shadow-item c="#555 dark:#bbb" font-bold rounded-b-10px
      @click="emits('clickMenu')"
    >
      <div
        p-10px text-18px
        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" text-center
        @click="toList('today')"
      >
        {{ t('startPage.today') }}
      </div>
      <div
        p-10px text-18px
        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" text-center
        @click="toList('star')"
      >
        {{ t('listMenu.star') }}
      </div>
      <div
        p-10px text-18px
        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" text-center
        @click="router.push('/')"
      >
        {{ t('listMenu.allTodo') }}
      </div>
      <div
        p-10px text-18px
        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" text-center
        @click="toList('allDo')"
      >
        {{ t('listMenu.completed') }}
      </div>
      <div
        p-10px text-18px
        bg="hover:black/5 active:black/10" w="[calc(100vw-20px)]" text-center
        @click="toList('allNotDo')"
      >
        {{ t('listMenu.incompleted') }}
      </div>
      <div
        v-for="cate in cateList" :key="cate.id" p-10px w="[calc(100vw-20px)]"
        text-center
        text-18px
        bg="hover:black/5 active:black/10"
        @click="toList(`${cate.id}`)"
      >
        {{ cate.title }}
      </div>
    </PerfectScrollbar>
  </div>
  <div
    class="black" bg-black rounded-7px
    w-screen h-screen fixed
    z-1
  />
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
  animation: showList .3s forwards;
}

.black {
  animation: back .3s forwards;
}
</style>
