<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue'
import { computed, onUnmounted, reactive, ref, useTemplateRef, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'
import router from '../../router'
import emitter from '../../util/bus'
import LocalStorage from '../../util/localStorage'
import saveItemSet from '../List/saveItemSet'
import Search from '../Search/Search.vue'
import changeCate from './changCate'
import Icons from './MenuItem/Icons/Icons.vine'
import MenuItem from './MenuItem/MenuItem.vue'
import TitleMenuItem from './TitleMenuItem'
import type ITodoList from '../../interface/ITodoListArray'
import type ListItems from '../../pages/Laboratory/showListItem/ListItems'
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
const useCateListRef = useTemplateRef('cateListRef')
const ps = ref(0)
function showAddFn() {
  showAdd.value = !showAdd.value
}
function onScroll() {
  ps.value = useCateListRef.value!.ps!.scrollbarYTop
}

const icon = ref('i-ph:radio-button-bold')
function addCate() {
  cateList.push({
    id: new Date().getTime(),
    title: cateTitle.value,
    icon: icon.value,
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
  icon.value = 'i-ph:radio-button-bold'
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

function setIcon(id: number, icon: string) {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === id)
      cateList[i].icon = icon
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

const showList: Ref<ListItems> = ref(localStorage.getItem('listMenuItem') && JSON.parse(localStorage.getItem('listMenuItem')!).today.name !== 'today'
  ? JSON.parse(localStorage.getItem('listMenuItem')!) as ListItems
  : {
      today: {
        name: 'custList.today',
        show: true,
      },
      star: {
        name: 'custList.star',
        show: true,
      },
      allDo: {
        name: 'custList.completed',
        show: true,
      },
      allNotDo: {
        name: 'custList.incompleted',
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

const systemBarShow = localStorage.getItem('systemTitle') === 'true'

const loginText = ref(localStorage.getItem('uid') ? localStorage.getItem('uname') : t('loginText'))

emitter.on('setLoginText', (uname) => {
  loginText.value = uname as string
})

function editCate(id: number, title: string) {
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

onUnmounted(() => {
  emitter.off('setCate')
  emitter.off('setListItem')
  emitter.off('setLoginText')
})

const count = computed(() => Object.values(showList.value).filter(obj => !obj.show).length)

const showIcons = ref(false)

const showSearch = ref(false)
const useSystemTitleBar = localStorage.getItem('systemTitle') === 'true'
</script>

<template>
  <div
    class="list-menu drag"
    :w="menuShort ? '58px' : '300px'"
    :style="{ backgroundColor: listMenuColor, height: titleBarShow ? '100vh' : '' }"
  >
    <div
      v-if="(route.name === 'Home' || route.name === 'other') && !menuShort"
      absolute right-10px :top="useSystemTitleBar ? '10px' : '-26px'" rounded-7px p-10px no-drag
      bg="#333/20 dark:#bbb/20 active:#333/50 active:dark:#bbb/50"
      @click="showSearch = true"
    >
      <div i-ph:magnifying-glass-bold block />
    </div>
    <div
      m="l-13px t-8px"
      bg="hover:black/10 active:black/20"
      w-20px rounded-5px p-5px no-drag
      @click="menuShort = !menuShort"
    >
      <div i-ph:list-bold block text-20px c="black/56 dark:#bbb" />
    </div>
    <div class="list">
      <TitleMenuItem v-if="!menuShort" />
      <!-- <span v-if="!menuShort" class="title" c="dark:!#bbb" :mt="isMac() ? '' : (systemBarShow ? '!-30px' : '!10px')">{{ t('accountPage.account') }}</span> -->
      <div
        v-if="menuShort"
        class="group account-list"
        :mt="menuShort ? (systemBarShow ? '!-110px' : '!-70px') : ''"
        :mb="menuShort ? '' : '!10px'"
        :bg="routeName === 'account' && form !== 'setting' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d'"
        @click="router.push('/account')"
      >
        <div>
          <div
            i-ph:user-circle-bold text-18px
            :c="routeName === 'account' && form !== 'setting' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
          />
          <span
            style="font-size: 14px; margin-left: 10px;"
            :c="routeName === 'account' && form !== 'setting' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
          >{{ loginText }}</span>
        </div>
      </div>
      <span v-if="!menuShort" class="title" c="dark:!#bbb" mb="!10px">{{ t('listMenu.cate') }}</span>
      <perfect-scrollbar
        ref="cateListRef" class="cate"
        :style="{
          height: (menuShort
            ? 'calc(100vh - 260px)'
            : (count > 1
              ? (count > 3 ? 'calc(100vh - 348px)' : 'calc(100vh - 434px)')
              : 'calc(100vh - 520px)')),
        }"
        :shadow="ps === 0 ? '' : 'inner'" @ps-scroll-y="onScroll"
      >
        <div
          v-if="showList.today.show && menuShort"
          class="group all-todo-list"
          :bg="routeQueryName === 'today' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
          @click="toList('today')"
        >
          <div>
            <div
              i-ph:sun-dim-bold text-18px
              :c="routeQueryName === 'today' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'today' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
            >{{ t('startPage.today') }}</span>
          </div>
        </div>
        <div
          v-if="showList.star.show && menuShort"
          class="all-todo-list group"
          :bg="routeQueryName === 'star' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
          @click="toList('star')"
        >
          <div>
            <div
              i-ph:star-bold text-18px
              :c="routeQueryName === 'star' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'star' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
            >{{ t('listMenu.star') }}</span>
          </div>
        </div>
        <div
          v-if="menuShort"
          class="all-todo-list group"
          :bg="routeName === 'Home' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
          @click="router.push('/')"
        >
          <div>
            <div
              i-ph:list-dashes-bold text-18px
              :c="routeName === 'Home' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeName === 'Home' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
            >{{ t('listMenu.allTodo') }}</span>
          </div>
        </div>
        <div
          v-if="showList.allNotDo.show && menuShort"
          class="all-todo-list group"
          :bg="routeQueryName === 'allNotDo' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
          @click="toList('allNotDo')"
        >
          <div>
            <div
              i-ph:circle-bold text-18px
              :c="routeQueryName === 'allNotDo' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'allNotDo' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
            >{{ t('listMenu.incompleted') }}</span>
          </div>
        </div>
        <div
          v-if="showList.allDo.show && menuShort"
          class="all-todo-list group"
          :bg="routeQueryName === 'allDo' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
          @click="toList('allDo')"
        >
          <div>
            <div
              i-ph:check-circle-bold text-18px
              :c="routeQueryName === 'allDo' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
            />
            <span
              style="font-size: 14px; margin-left: 10px;"
              :c="routeQueryName === 'allDo' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
            >{{ t('listMenu.completed') }}</span>
          </div>
        </div>
        <MenuItem
          v-for="item in cateList"
          :id="item.id"
          :key="item.id"
          :icon="item.icon"
          :title="item.title"
          @del-cate="delCate"
          @edit-cate="editCate"
          @del-with-to-do="delWithToDo"
          @set-icon="setIcon"
        />
        <div
          v-if="showAdd"
          w="260px"
          bg="black/5 dark:#999/10" mb-5px ml-10px
          flex cursor-pointer items-center justify-center
          rounded-7px p-10px no-drag
          mt="10px"
        >
          <div w="100%" flex items-center>
            <div
              bg="black/5" mr-7px rounded-5px p-4px
            >
              <VDropdown
                v-model:shown="showIcons"
                :distance="12"
                :skidding="-12"
                placement="top-start"
              >
                <div
                  v-close-popper
                  :class="icon" block="!~" text-16px
                  c="group-hover:white #00000090 dark:#bbb"
                />
                <template #popper>
                  <Icons
                    v-close-popper
                    :icon="icon"
                    @set-icon="(cIcon: string) => {
                      icon = cIcon
                    }"
                  />
                </template>
              </VDropdown>
            </div>
            <input
              v-model="cateTitle"
              v-focus
              w="100%"
              bg="black/5" c="dark:#bbb"
              rounded-5px border-none p-5px text-12px outline-none
              type="text"
              @keydown.enter="addCate"
            >
            <div

              bg="black/5 hover:black/10 active:black/15 dark:#999/5 dark:hover:#999/10 dark:active:#999/15"
              h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '0px'"
              :m="cateTitle !== '' ? 'x-8px' : 'l-8px'" flex items-center justify-center rounded-5px
              transition="300 width margin"
              @click="addCate"
            >
              <div i-mdi:check-bold c="#777 dark:#bbb" />
            </div>
            <div

              bg="black/5 hover:black/10 active:black/15 dark:#999/5 dark:hover:#999/10 dark:active:#999/15"
              h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '[calc(1em+12px)]'"
              flex items-center justify-center rounded-5px transition="300 width margin"
              @click="showAdd = false"
            >
              <div i-mdi:close-thick c="#777 dark:#bbb" />
            </div>
          </div>
        </div>
        <div
          v-if="!menuShort"
          w="260px"

          ml-10px h-18px flex cursor-pointer items-center justify-center rounded-7px p-10px no-drag
          bg="active:#00000010 hover:black/10 black/5 dark:#999/5 dark:hover:#999/10 dark:active:#999/15"
          :mt="showAdd ? '' : '10px'"
          @click="showAddFn"
        >
          <div>
            <div i-fluent:add-12-filled block text-center text-18px c="#00000090 dark:#bbb" />
          </div>
        </div>
      </perfect-scrollbar>
    </div>
    <div class="list">
      <div
        mb="!20px"
        class="group setting-list"
        :bg="routeName === 'setting' || form === 'setting' ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
        @click="router.push('/setting')"
      >
        <div>
          <div
            i-ph:gear-fine-bold text-18px
            :c="routeName === 'setting' || form === 'setting' ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
          />
          <span
            :c="routeName === 'setting' || form === 'setting' ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
            style="font-size: 14px; margin-left: 10px;"
          >{{ t('settingTitleText') }}</span>
        </div>
      </div>
    </div>
    <Search :open="showSearch" @close="showSearch = false" />
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
