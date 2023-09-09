<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Dropdown as VDropdown } from 'floating-vue'
import router from '../../router'
import emitter from '../../util/bus'
import type ListItems from '../../pages/Laboratory/showListItem/ListItems'
import LocalStorage from '../../util/localStorage'
import type ITodoList from '../../interface/ITodoListArray'
import saveItemSet from '../List/saveItemSet'
import changeCate from './changCate'
import type { cateItem } from './ICateItem'
import MenuItem from './MenuItem/MenuItem.vue'
import TitleMenuItem from './TitleMenuItem'
import Icons from './MenuItem/Icons'

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

const count = computed(() => Object.values(showList.value).filter(obj => !obj.show).length)

const showIcons = ref(false)
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
      <div i-ph:list-bold text-20px block c="black/56 dark:#bbb" />
    </div>
    <div class="list">
      <TitleMenuItem v-if="!menuShort" />
      <!-- <span v-if="!menuShort" class="title" c="dark:!#bbb" :mt="isMac() ? '' : (systemBarShow ? '!-30px' : '!10px')">{{ t('accountPage.account') }}</span> -->
      <div
        v-if="menuShort"
        class="account-list group"
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
          class="all-todo-list group"
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
          v-if="showAdd" flex items-center
          justify-center p-10px ml-10px no-drag
          w="260px" cursor-pointer mb-5px
          bg="black/5 dark:#999/10" rounded-7px
          mt="10px"
        >
          <div w="100%" flex items-center>
            <div
              p-4px mr-7px
              bg="black/5" rounded-5px
            >
              <VDropdown
                v-model:shown="showIcons"
                :distance="12"
                :skidding="-12"
                placement="top-start"
              >
                <div
                  :class="icon" text-15px block
                  c="group-hover:white #00000090 dark:#bbb"
                  @click.stop="showIcons = true"
                />
                <template #popper>
                  <Icons
                    :icon="icon"
                    @set-icon="(cIcon: string) => {
                      showIcons = false
                      icon = cIcon
                    }"
                  />
                </template>
              </VDropdown>
            </div>
            <input
              v-model="cateTitle"
              v-focus
              w="100%" text-12px rounded-5px
              p-5px bg="black/5" border-none c="dark:#bbb"
              outline-none
              type="text"
              @keydown.enter="addCate"
            >
            <div
              flex justify-center items-center
              bg="black/5 hover:black/10 active:black/15 dark:#999/5 dark:hover:#999/10 dark:active:#999/15"
              h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '0px'"
              :m="cateTitle !== '' ? 'x-8px' : 'l-8px'" rounded-5px
              transition="300 width margin"
              @click="addCate"
            >
              <div i-mdi:check-bold c="#777 dark:#bbb" />
            </div>
            <div
              flex justify-center items-center
              bg="black/5 hover:black/10 active:black/15 dark:#999/5 dark:hover:#999/10 dark:active:#999/15"
              h="[calc(1em+8px)]" :w="cateTitle !== '' ? '[calc(1em+16px)]' : '[calc(1em+12px)]'"
              rounded-5px transition="300 width margin"
              @click="showAdd = false"
            >
              <div i-mdi:close-thick c="#777 dark:#bbb" />
            </div>
          </div>
        </div>
        <div
          v-if="!menuShort" flex items-center
          justify-center p-10px w="260px" ml-10px
          h-18px cursor-pointer
          rounded-7px no-drag
          bg="active:#00000010 hover:black/10 black/5 dark:#999/5 dark:hover:#999/10 dark:active:#999/15"
          :mt="showAdd ? '' : '10px'"
          @click="showAddFn"
        >
          <div>
            <div i-fluent:add-12-filled block text-18px text-center c="#00000090 dark:#bbb" />
          </div>
        </div>
      </perfect-scrollbar>
    </div>
    <div class="list">
      <div
        mb="!20px"
        class="setting-list group"
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
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
