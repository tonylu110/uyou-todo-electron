<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePreferredDark } from '@vueuse/core'
import LocalStorage from '../../util/localStorage'
import type ITodoList from '../../interface/ITodoListArray'
import setSwitchFn from '../../util/setSwitchFn'
import { isLinux, isWindows10OrAfter } from '../../util/os'
import emitter from '../../util/bus'
import type { cateItem } from '../ListMenu/ICateItem'
import Item from './Item/Item.vue'
import saveItemSet from './saveItemSet'
import AddItem from './AddItem/AddItem.vue'

const props = withDefaults(defineProps<{
  showAddItem: boolean
  listData: ITodoList[]
  color?: string | null
}>(), {
  color: 'primary-d',
})

const emits = defineEmits<{
  (e: 'setAddItem'): void
}>()

const { t } = useI18n()

const route = useRoute()

const list: Ref<ITodoList[]> = ref(props.listData) as Ref<ITodoList[]>
const listAll: Ref<ITodoList[]> = ref(LocalStorage('get')) as Ref<ITodoList[]>

watchEffect(() => {
  list.value = props.listData as unknown as ITodoList[]
})

onMounted(() => {
  if (route.name === 'Home') {
    const uid = localStorage.getItem('uid')
    const autoSync = localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null
    if ((uid !== '' && uid !== null) && autoSync) {
      fetch('https://api.todo.uyou.org.cn/gettodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
        }),
      }).then((res) => {
        return res.json()
      }).then((res) => {
        localStorage.setItem('ToDo', res.data)
        list.value = LocalStorage('get') as ITodoList[]
      })
    }
  }
})

function setOk(id: number, isOk: boolean) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].ok = isOk
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].ok = isOk
  }
  saveItemSet(listAll.value!)
}
emitter.on('searchSetOk', (data) => {
  const useData = data as {
    id: number
    ok: boolean
  }

  setOk(useData.id, useData.ok)
})

function addItem(id: number, text: string) {
  emits('setAddItem')
  if (route.query.listName) {
    const item: ITodoList = {
      text,
      id,
      ok: false,
      cate: `${route.query.listName}`,
    }
    list.value!.unshift(item)
    listAll.value!.unshift(item)
    saveItemSet(listAll.value!)
  }
  else {
    const item: ITodoList = {
      text,
      id,
      ok: false,
    }
    list.value!.unshift(item)
    listAll.value!.unshift(item)
    saveItemSet(list.value!)
  }
}

function setAddItem() {
  emits('setAddItem')
}

function deleteItem(id: number) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value!.splice(i, 1)
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value!.splice(i, 1)
  }
  saveItemSet(listAll.value!)
}
emitter.on('searchDelete', (id) => {
  const useId = id as number

  deleteItem(useId)
})

const routeName = ref(route.name)
watchEffect(() => {
  routeName.value = route.name
})

function setCate(id: number, cateId: number) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].cate = `${cateId}`
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].cate = `${cateId}`
  }
  saveItemSet(listAll.value!)
}

function setStar(id: number, star: boolean) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].star = star
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].star = star
  }
  saveItemSet(listAll.value!)
}
emitter.on('searchSetStar', (data) => {
  const useData = data as {
    id: number
    star: boolean
  }

  setStar(useData.id, useData.star)
})

function editItem(id: number, text: string) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].text = text
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].text = text
  }
  saveItemSet(listAll.value!)
}

const showNotDo = ref(localStorage.getItem('notDoShow') === 'true' || localStorage.getItem('notDoShow') === null)
const simpleMode = localStorage.getItem('simpleMode') === 'true'
const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)
const bgColor = computed(() => cateList.filter(value => value.id === Number(route.query.listName))[0])

const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')

const colorUse = computed(() => useCustColor.value ? cateList.find(item => item.id === Number(route.query.listName))?.color : 'primary-d')

emitter.on('changeBgColor', (color) => {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === Number(route.query.listName))
      cateList[i].color = color as string | null
  }
})

const dragIndex = ref(0)
function dragstart(index: number) {
  dragIndex.value = index
}
function dragenter(index: number) {
  if (dragIndex.value !== index) {
    const moving = list.value[dragIndex.value]
    list.value.splice(dragIndex.value, 1)
    list.value.splice(index, 0, moving)
    listAll.value.splice(dragIndex.value, 1)
    listAll.value.splice(index, 0, moving)
    dragIndex.value = index
  }
}

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})

function setReminder(id: number, time: number) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].time = time
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].time = time
  }
  saveItemSet(listAll.value!)
}

const isDark = usePreferredDark()
</script>

<template>
  <perfect-scrollbar
    class="list"
    :style="{
      backgroundColor: !isNaN(Number.parseInt((route.query.listName as string))) && useCustColor
        ? isBlur
          ? bgColor.color
            ? `${bgColor.color}50` : isDark ? 'rgba(51, 51, 51, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          : bgColor
            ? `${bgColor.color}cc` : isDark ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        : isBlur
          ? isDark ? 'rgba(51, 51, 51, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          : isDark ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    }"
  >
    <transition name="add">
      <div v-if="showAddItem" class="add-list">
        <AddItem
          @set-add-item="setAddItem"
          @add-item="addItem"
        />
      </div>
    </transition>
    <transition-group v-if="routeName === 'Home' || route.query.listName === 'allDo' || route.query.listName === 'allNotDo'" :name="routeName === 'Home' ? 'item' : 'other'">
      <Item
        v-for="(item, index) in list"
        :key="item.id"
        :text="item.text"
        :time="item.id"
        :is-ok="item.ok"
        :is-star="item.star"
        :index="index"
        :reminder="item.time"
        @set-ok="setOk"
        @delete-item="deleteItem"
        @edit-item="editItem"
        @set-cate="setCate"
        @set-star="setStar"
        @set-reminder="setReminder"
        @dragstart="dragstart"
        @dragenter="dragenter"
        @dragend="saveItemSet(listAll!)"
      />
    </transition-group>
    <!-- eslint-disable-next-line vue/no-useless-template-attributes -->
    <template v-else name="other">
      <Item
        v-for="(item, index) in list.filter(listData => listData.ok === false)"
        :key="item.id"
        :text="item.text"
        :time="item.id"
        :is-ok="item.ok"
        :is-star="item.star"
        :index="index"
        :reminder="item.time"
        :color="colorUse"
        @set-ok="setOk"
        @delete-item="deleteItem"
        @edit-item="editItem"
        @set-cate="setCate"
        @set-star="setStar"
        @set-reminder="setReminder"
        @dragstart="dragstart"
        @dragenter="dragenter"
        @dragend="saveItemSet(listAll!)"
      />
      <div
        v-if="route.query.listName !== 'allDo' && route.query.listName !== 'allNotDo' && list.filter(listData => listData.ok === true).length > 0"
        bg="#eee/80 dark:#222/50 hover:#eee/90 dark:hover:#222/60 active:#eee dark:active:#222/70"
        :transform="simpleMode ? 'translate-x-[calc(-50vw+50%+10px)]' : (menuShort ? 'translate-x-[calc(((-100vw+58px)/2)+50%+10px)]' : 'translate-x-[calc(((-100vw+300px)/2)+50%+10px)]')"
        c="#555 dark:#bbb"
        mb-10px flex cursor-pointer items-center whitespace-nowrap rounded-5px p-x-10px p-y-5px font-bold
        shadow="sm black/30"
        @click="setSwitchFn('notDoShow', !showNotDo, () => showNotDo = !showNotDo)"
      >
        <div :rotate="showNotDo ? '0' : '-90'" i-fluent:caret-down-12-filled mr-5px text-18px transition-300 />
        {{ t('listMenu.completed') }}
        <div

          bg="#555 dark:#bbb" c="#eee dark:#222"

          ml-5px h-1rem w-1rem flex items-center justify-center rounded-20px text-10px font-normal
        >
          {{ list!.filter(listData => listData.ok === true).length }}
        </div>
      </div>
      <template v-if="showNotDo">
        <Item
          v-for="(item, index) in list.filter(listData => listData.ok === true)"
          :key="item.id"
          :text="item.text"
          :time="item.id"
          :is-ok="item.ok"
          :is-star="item.star"
          :index="index"
          :reminder="item.time"
          :color="colorUse"
          @set-ok="setOk"
          @delete-item="deleteItem"
          @edit-item="editItem"
          @set-cate="setCate"
          @set-star="setStar"
          @set-reminder="setReminder"
          @dragstart="dragstart"
          @dragenter="dragenter"
          @dragend="saveItemSet(listAll!)"
        />
      </template>
    </template>
    <div
      v-if="list.length === 0"
      i-mdi:list-box-outline top="50%" transform="translate-y-[calc(-50%-20px)]"
      absolute text-150px
      c="black/10"
    />
  </perfect-scrollbar>
</template>

<style scoped lang="scss">
.list {
  height: calc(100% - 105px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;

  .add-list {
    width: calc(100% - 20px);
  }
}

.add-enter-from,
.add-leave-to {
  margin-top: calc(-103px - 4em);
}

.add-enter-to,
.add-leave-from {
  margin-top: 0;
}

.add-enter-active,
.add-leave-active {
  transition: margin 0.3s;
}

.item-leave-to {
  transform: translate(-120%);
}

.item-enter-from,
.item-enter-to,
.item-leave-from {
  transform: translateX(0);
}

.item-enter-active,
.item-leave-active {
  transition: transform 0.4s;
}

.item-move {
  transition: all 0.5s;
}
</style>
