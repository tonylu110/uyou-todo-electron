<script setup lang="ts">
import type { Ref } from 'vue'
import { reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import router from '../../router'
import emitter from '../../util/bus'
import { isMac } from '../../util/os'
import type ListItems from '../../pages/Laboratory/showListItem/ListItems'
import changeCate from './changCate'
import type { cateItem } from './ICateItem'

const { t } = useI18n()

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

function toList(listName: string) {
  router.push({
    path: '/other',
    query: {
      listName,
    },
  })
}

const listMenuColor = ref('#00000000')

const showAdd = ref(false)
const cateTitle = ref('')
const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)
const cateListRef = ref(null) as unknown as Ref<{ $el: HTMLAreaElement; ps: { scrollbarYTop: number } }>
const ps = ref(0)
function showAddFn() {
  showAdd.value = !showAdd.value
}
function onScroll() {
  ps.value = cateListRef.value.ps.scrollbarYTop
}

function addCate() {
  cateList.push({
    id: new Date().getTime(),
    title: cateTitle.value,
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
  showAdd.value = false
  cateTitle.value = ''
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

emitter.on('setCate', (data) => {
  cateList.length = 0
  JSON.parse((data as string)).data.forEach((item: cateItem) => {
    cateList.push(item)
  })
})

const showList: Ref<ListItems> = ref(localStorage.getItem('listMenuItem')
  ? JSON.parse(localStorage.getItem('listMenuItem')!) as ListItems
  : {
      today: {
        name: 'today',
        show: true,
      },
      star: {
        name: 'star',
        show: true,
      },
      allDo: {
        name: 'completed',
        show: true,
      },
      allNotDo: {
        name: 'incompleted',
        show: true,
      },
    } as ListItems,
)

emitter.on('setListItem', (data) => {
  showList.value = (data as ListItems)
})

const menuShort = ref(window.innerWidth < 750)
watch(menuShort, () => {
  emitter.emit('menuClose', menuShort.value)
})
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})
</script>

<template>
  <div
    class="list-menu drag"
    :w="menuShort ? '58px' : '300px'"
    :style="{ backgroundColor: listMenuColor, height: titleBarShow ? '100vh' : '' }"
  >
    <div
      m="l-13px t-8px" rounded-5px
      bg="hover:black/10 active:black/20"
      p-5px w-20px no-drag
      @click="menuShort = !menuShort"
    >
      <div i-ph:list-bold text-20px block c="black/56" />
    </div>
    <div class="list">
      <span v-if="!menuShort" class="title" :mt="isMac() ? '' : '!10px'">{{ t('accountPage.account') }}</span>
      <div
        class="account-list group"
        :mt="menuShort ? '!-70px' : ''"
        :mb="menuShort ? '' : '!10px'"
        :bg="routeName === 'account' && form !== 'setting' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
        @click="router.push('/account')"
      >
        <div>
          <div
            i-mdi:account-circle text-18px
            :c="routeName === 'account' && form !== 'setting' ? 'white group-hover:white' : 'group-hover:white #00000090'"
          />
          <span
            style="font-size: 14px; margin-left: 10px;"
            :c="routeName === 'account' && form !== 'setting' ? '!white group-hover:!white' : 'group-hover:!white'"
          >{{ t('myAccount') }}</span>
        </div>
      </div>
      <span v-if="!menuShort" class="title" mb="!10px">{{ t('listMenu.cate') }}</span>
      <perfect-scrollbar ref="cateListRef" class="cate" :shadow="ps === 0 ? '' : 'inner'" @ps-scroll-y="onScroll">
        <div
          v-if="showList.today.show"
          class="all-todo-list group"
          :bg="routeQueryName === 'today' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
          @click="toList('today')"
        >
          <div>
            <div
              i-mdi:weather-sunny text-18px
              :c="routeQueryName === 'today' ? 'white group-hover:white' : 'group-hover:white #00000090'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'today' ? '!white group-hover:!white' : 'group-hover:!white'"
            >{{ t('startPage.today') }}</span>
          </div>
        </div>
        <div
          v-if="showList.star.show"
          class="all-todo-list group"
          :bg="routeQueryName === 'star' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
          @click="toList('star')"
        >
          <div>
            <div
              i-fluent:star-12-regular text-18px
              :c="routeQueryName === 'star' ? 'white group-hover:white' : 'group-hover:white #00000090'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'star' ? '!white group-hover:!white' : 'group-hover:!white'"
            >{{ $t('listMenu.star') }}</span>
          </div>
        </div>
        <div
          class="all-todo-list group"
          :bg="routeName === 'Home' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
          @click="router.push('/')"
        >
          <div>
            <div
              i-mdi:list-box-outline text-18px
              :c="routeName === 'Home' ? 'white group-hover:white' : 'group-hover:white #00000090'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeName === 'Home' ? '!white group-hover:!white' : 'group-hover:!white'"
            >{{ t('listMenu.allTodo') }}</span>
          </div>
        </div>
        <div
          v-if="showList.allNotDo.show"
          class="all-todo-list group"
          :bg="routeQueryName === 'allNotDo' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
          @click="toList('allNotDo')"
        >
          <div>
            <div
              i-mdi:circle-outline text-18px
              :c="routeQueryName === 'allNotDo' ? 'white group-hover:white' : 'group-hover:white #00000090'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'allNotDo' ? '!white group-hover:!white' : 'group-hover:!white'"
            >{{ t('listMenu.incompleted') }}</span>
          </div>
        </div>
        <div
          v-if="showList.allDo.show"
          class="all-todo-list group"
          :bg="routeQueryName === 'allDo' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
          @click="toList('allDo')"
        >
          <div>
            <div
              i-mdi:checkbox-marked-circle text-18px
              :c="routeQueryName === 'allDo' ? 'white group-hover:white' : 'group-hover:white #00000090'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'allDo' ? '!white group-hover:!white' : 'group-hover:!white'"
            >{{ t('listMenu.completed') }}</span>
          </div>
        </div>
        <div
          v-for="item in cateList"
          :key="item.id"
          class="all-todo-list group"
          :bg="routeQueryName === `${item.id}` ? 'primary-d hover:primary-a' : 'hover:primary-d'"
          @click="toList(`${item.id}`)"
        >
          <div>
            <div
              i-mdi:star-circle-outline text-18px
              :c="routeQueryName === `${item.id}` ? 'white group-hover:white' : 'group-hover:white #00000090'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === `${item.id}` ? '!white group-hover:!white' : 'group-hover:!white'"
            >{{ item.title }}</span>
          </div>
          <div
            flex justify-center items-center
            :bg="routeQueryName === `${item.id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
            h="18px" w="18px"
            rounded-xl transition="300 width margin"
            @click.stop="delCate(item.id)"
          >
            <div i-mdi:close-thick :c="routeQueryName === `${item.id}` ? 'white' : '#777 group-hover:white'" text-12px />
          </div>
        </div>
        <div
          v-if="showAdd" flex items-center
          justify-center p-10px ml-10px
          w="260px" cursor-pointer mb-5px
          bg="black/5" rounded-7px
          mt="10px"
        >
          <div w="100%" flex items-center>
            <input
              v-model="cateTitle" w="100%" text-12px rounded-5px
              p-5px bg="black/5" border-none
              outline-none
              autofocus="true"
              type="text"
            >
            <div
              flex justify-center items-center
              bg="black/5 hover:black/10 active:black/15"
              h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '0px'"
              :m="cateTitle !== '' ? 'x-8px' : 'l-8px'" rounded-5px
              transition="300 width margin"
              @click="addCate"
            >
              <div i-mdi:check-bold c="#777" />
            </div>
            <div
              flex justify-center items-center
              bg="black/5 hover:black/10 active:black/15"
              h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '[calc(1em+12px)]'"
              rounded-5px transition="300 width margin"
              @click="showAdd = false"
            >
              <div i-mdi:close-thick c="#777" />
            </div>
          </div>
        </div>
        <div
          v-if="!menuShort" flex items-center
          justify-center p-10px w="260px" ml-10px
          h-18px cursor-pointer
          rounded-7px
          bg="active:#00000010 hover:black/10 black/5"
          :mt="showAdd ? '' : '10px'"
          @click="showAddFn"
        >
          <div>
            <div i-fluent:add-12-filled block text-18px text-center c="#00000090" />
          </div>
        </div>
      </perfect-scrollbar>
    </div>
    <div class="list">
      <div
        mb="!20px"
        class="setting-list group"
        :bg="routeName === 'setting' || form === 'setting' ? 'primary-d hover:primary-a' : 'hover:primary-d'"
        @click="router.push('/setting')"
      >
        <div>
          <div
            i-mdi:cog text-18px
            :c="routeName === 'setting' || form === 'setting' ? 'white group-hover:white' : 'group-hover:white #00000090'"
          />
          <span
            :c="routeName === 'setting' || form === 'setting' ? '!white group-hover:!white' : 'group-hover:!white'"
            style="font-size: 14px; margin-left: 10px;"
          >{{ t('settingTitleText') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
