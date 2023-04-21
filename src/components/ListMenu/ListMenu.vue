<template>
  <div class="list-menu" :style="{backgroundColor: listMenuColor, height: titleBarShow ? '100vh' : ''}">
    <div class="list">
      <span class="title">{{ i18n().accountPage.account }}</span>
      <div class="account-list" 
        :style="{backgroundColor: routeName === 'account' && form !== 'setting' ? '#00000010' : ''}" 
        @click="router.push('/account')"
      >
        <div>
          <div i-mdi:account-circle text-18px c="#00000090"></div>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().myAccount }}</span>
        </div>
      </div>
      <span class="title">{{ i18n().listMenu.cate }}</span>
      <div class="all-todo-list" 
        :style="{ backgroundColor: routeName === 'Home' ? '#00000010' : '', borderTop: '2px solid #00000010' }" 
        @click="router.push('/')"
      >
        <div>
          <div i-mdi:list-box-outline text-18px c="#00000090"></div>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.allTodo }}</span>
        </div>
      </div>
      <div class="all-todo-list" :style="{backgroundColor: routeQueryName === 'allNotDo' ? '#00000010' : ''}" @click="toList('allNotDo')">
        <div>
          <div i-mdi:circle-outline text-18px c="#00000090"></div>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.incompleted }}</span>
        </div>
      </div>
      <div class="all-todo-list" :style="{backgroundColor: routeQueryName === 'allDo' ? '#00000010' : ''}" @click="toList('allDo')">
        <div>
          <div i-mdi:checkbox-marked-circle text-18px c="#00000090"></div>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.completed }}</span>
        </div>
      </div>
      <div 
        v-for="item in cateList"
        class="all-todo-list" 
        :style="{backgroundColor: routeQueryName === item.id + '' ? '#00000010' : ''}" 
        @click="toList(item.id + '')"
        :key="item.id"
      >
        <div>
          <div i-mdi:star-circle-outline text-18px c="#00000090"></div>
          <span style="font-size: 14px; margin-left: 10px;">{{ item.title }}</span>
        </div>
        <div 
          flex justify-center items-center 
          bg="black/5 hover:black/10 active:black/15" 
          h="[calc(1em+8px)]" w="[calc(1em+8px)]"
          rounded-5px transition="300 width margin"
          @click.stop="delCate(item.id)"
        >
          <div i-mdi:close-thick c="#777"></div>
        </div>
      </div>
      <div
        flex items-center justify-center
        p-x-20px p-y-10px w="259px"
        cursor-pointer border="b-2px t-0 l-0 r-0 solid #00000010" 
        mt="10px"
        v-if="showAdd"
      >
        <div w="100%" flex items-center>
          <input 
            w="100%" text-12px rounded-5px p-5px
            bg="black/5" border-none outline-none
            autofocus="true"
            type="text"
            v-model="cateTitle"
          >
          <div 
            flex justify-center items-center 
            bg="black/5 hover:black/10 active:black/15" 
            h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '0px'"
            :m="cateTitle !== '' ? 'x-8px' : 'l-8px'" rounded-5px
            transition="300 width margin"
            @click="addCate"
          >
            <div i-mdi:check-bold c="#777"></div>
          </div>
          <div 
            flex justify-center items-center 
            bg="black/5 hover:black/10 active:black/15" 
            h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '[calc(1em+12px)]'"
            rounded-5px transition="300 width margin"
            @click="showAdd = false"
          >
            <div i-mdi:close-thick c="#777"></div>
          </div>
        </div>
      </div>
      <div 
        flex items-center justify-center
        p-x-20px p-y-10px w="259px"
        cursor-pointer border="b-2px t-0 l-0 r-0 solid #00000010" 
        bg="active:#00000010 hover:#00000005"
        :mt="showAdd ? '' : '10px'"
        @click="showAdd = !showAdd"
      >
        <div>
          <div i-fluent:add-12-filled text-18px c="#00000090"></div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="setting-list" :style="{backgroundColor: routeName === 'setting' || form === 'setting' ? '#00000010' : ''}" @click="router.push('/setting')">
        <div>
          <div i-mdi:cog text-18px c="#00000090"></div>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().settingTitleText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import i18n from '../../i18n';
import router from '../../router';
import { ref, watchEffect, reactive } from 'vue';
import { useRoute } from 'vue-router';

const os = require("os")

const titleBarShow = localStorage.getItem('systemTitle') === 'true'

const routeName = ref('')
const routeQueryName = ref('')
const route = useRoute()

const form = ref('')

watchEffect(() => {
  routeName.value = route.name as unknown as string
  routeQueryName.value = route.query.listName as unknown as string
  form.value = route.query.from as unknown as string
})

const toList = (listName: string) => {
  router.push({
    path: '/other',
    query: {
      listName
    }
  })
}

const isWindows = navigator.userAgent.indexOf('Win')>=0
const listMenuColor = ref('')
const isWindows10OrAfter = os.release().split('.')[2] > 15063
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && isWindows10OrAfter) {
  listMenuColor.value = '#fff6dc00'
}

const showAdd = ref(false)
const cateTitle = ref('')
interface cateItem {
  id: number
  title: string
}
const cateList: cateItem[] = reactive([])
const addCate = () => {
  cateList.push({
    id: new Date().getTime(),
    title: cateTitle.value
  })
  showAdd.value = false
  cateTitle.value = ''
}
const delCate = (id: number) => {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === id) {
      cateList.splice(i, 1)
    }
  }
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>