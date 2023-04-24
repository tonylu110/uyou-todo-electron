<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { cateItem } from '../ListMenu/ICateItem';
import i18n from '../../i18n';
import { useRouter } from 'vue-router';
import emitter from '../../util/bus';

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)

emitter.on('setCate', (data) => {
  cateList.length = 0
  JSON.parse((data as string)).data.forEach((item: cateItem) => {
    cateList.push(item)
  })
})

const router = useRouter()
const toList = (listName: string) => {
  router.push({
    path: '/other',
    query: {
      listName
    }
  })
}

const emits = defineEmits<{
  (e: 'clickMenu'): void
}>()
</script>

<template>
  <div 
    fixed top-95px z-2 cursor-pointer
    bg="#fff6dc80" w-screen p-y-10px
    flex="~ col" items-center backdrop-blur-7px
    shadow-item c="black/50" font-bold rounded-b-10px
    @click="emits('clickMenu')"
    class="list"
  >
    <div 
      p-10px text-18px
      bg="hover:black/5 active:black/10" w-screen text-center
      @click="router.push('/')"
    >
      {{ i18n().listMenu.allTodo }}
    </div>
    <div 
      p-10px text-18px
      bg="hover:black/5 active:black/10" w-screen text-center
      @click="toList('allDo')"
    >
      {{ i18n().listMenu.completed }}
    </div>
    <div 
      p-10px text-18px
      bg="hover:black/5 active:black/10" w-screen text-center
      @click="toList('allNotDo')"
    >
      {{ i18n().listMenu.incompleted }}
    </div>
    <div
      p-10px w-screen text-center text-18px
      bg="hover:black/5 active:black/10"
      v-for="cate in cateList" 
      :key="cate.id"
      @click="toList(cate.id + '')"
    >
      {{ cate.title }}
    </div>
  </div>
  <div
    class="black" bg-black
    w-screen h-screen fixed
    z-1
  ></div>
</template>

<style scoped>
@keyframes showList {
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
}

@keyframes back {
  from {
    background-color: transparent;
  }
  to {
    background-color: #00000020;
  }
}

.list {
  animation: showList .5s linear forwards;
  overflow: hidden;
}

.black {
  animation: back .3s forwards;
}
</style>