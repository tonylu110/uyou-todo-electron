<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dropdown as VDropdown } from 'floating-vue'
import { useI18n } from 'vue-i18n'
import emitter from '../../../util/bus'
import type ITodoList from '../../../interface/ITodoListArray'
import Item from './Item/Item.vue'
import Edit from './Edit/Edit.vue'

interface Props {
  title: string
  id?: number | string
  color?: string | null
  icon?: string
  otherCate?: boolean
  showAddItem?: boolean
  showBtn?: boolean
  list: ITodoList[]
}

const { title = 'title', color = 'primary-d', showAddItem = true, showBtn = true, id, list } = defineProps<Props>()

const emits = defineEmits<{
  deleteCate: [id: number | string]
  delWithToDo: [id: number | string]
  delItem: [id: number]
  setOk: [id: number, ok: boolean]
  edit: [id: number | string, name: string, icon: string, color: string | null]
  editItem: [id: number, title: string, cateId: number | string]
  setStar: [id: number, star: boolean]
}>()

const { t } = useI18n()

const listData = computed(() => {
  if (id === 'today') {
    return list.filter(listData => new Date(listData.id).toDateString() === new Date().toDateString() || new Date(listData.time!).toDateString() === new Date().toDateString())
  }
  else if (id === 'star') {
    return list.filter(listData => listData.star)
  }
  else if (id === 'allNotDo') {
    return list.filter(listData => !listData.ok)
  }
  else if (id === 'allDo') {
    return list.filter(listData => listData.ok)
  }
  else {
    return list.filter(listData => listData.cate === `${id}`)
  }
})
const otherList = ref(list.filter(listData => listData.cate === undefined))

const isOpen = ref(false)

function add() {
  emitter.emit('noteShowAddItem', id!)
}
</script>

<template>
  <div
    mb-30px break-inside-avoid rounded-10px bg="white dark:#333" drop-shadow-md
  >
    <div
      p="y-5px x-10px r-0"
      :bg="color ? color : 'primary-d'"
      absolute ml-10px flex items-center rounded-7px c-white no-drag
      transform="translate-y--50%"
    >
      <div :class="otherCate ? 'i-ph:smiley-blank-bold' : (icon ? icon : 'i-ph:radio-button-bold')" mr-8px />
      <span>{{ title }}</span>
      <div
        v-if="showBtn"
        flex="~ gap-5px" w="0 hover:37px" transition="all 300"
        items-center overflow-hidden p="r-10px l-5px" op="0 hover:100"
      >
        <Edit
          :color
          :icon
          :name="title"
          @edit="(name, icon, color) => emits('edit', id!, name, icon, color)"
        />
        <VDropdown
          v-model:shown="isOpen"
          :distance="12"
          placement="top"
        >
          <div>
            <div i-ph:trash-bold block />
          </div>
          <template #popper>
            <div flex="~ col" items-center p-10px>
              <span text-14px>{{ t('listMenu.delCate', { title }) }}</span>
              <div mt-10px flex items-center justify-center>
                <button
                  v-close-popper
                  bg="white active:#ddd dark:#555 active:dark:#444"
                  p="x-10px y-5px"
                  mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
                  shadow="sm black/20" c="#555 dark:#ddd"
                >
                  <div i-mdi:close-thick mr-5px />
                  <span>{{ t('cancelText') }}</span>
                </button>
                <button
                  v-close-popper
                  bg="!primary-d active:!primary-a"
                  p="x-10px y-5px" c="!white"
                  shadow="sm black/20" mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
                  @click.stop="() => {
                    emits('deleteCate', id!)
                  }"
                >
                  <div i-mdi:check-bold mr-5px />
                  <span>{{ t('alertText.returnText') }}</span>
                </button>
                <button
                  v-close-popper
                  bg="!error-d active:!error-a"
                  p="x-10px y-5px" c="!white"
                  flex cursor-pointer items-center justify-center rounded-5px border-none
                  shadow="sm black/20"
                  @click.stop="() => {
                    emits('delWithToDo', id!)
                  }"
                >
                  <div i-ph:warning-circle-bold mr-5px />
                  <span>{{ t('listMenu.delTodo') }}</span>
                </button>
              </div>
            </div>
          </template>
        </VDropdown>
      </div>
      <div v-else w-13px />
    </div>
    <div p="10px t-20px">
      <template v-if="otherCate">
        <div v-for="item in otherList" :key="item.id">
          <Item
            :id="item.id"
            :title="item.text"
            :is-ok="item.ok"
            :cate-id="id"
            :star="item.star"
            @edit="(itemId, title, cateId) => emits('editItem', itemId, title, cateId)"
            @del="(itemId: number) => emits('delItem', itemId)"
            @set-ok="(itemId: number, isOk: boolean) => emits('setOk', itemId, isOk)"
            @set-star="(itemId: number, star: boolean) => emits('setStar', itemId, star)"
          />
        </div>
      </template>
      <template v-else>
        <div v-for="item in listData" :key="item.id">
          <Item
            :id="item.id"
            :title="item.text"
            :is-ok="item.ok"
            :color="color"
            :cate-id="id"
            :star="item.star"
            @edit="(itemId, title, cateId) => emits('editItem', itemId, title, cateId)"
            @del="(itemId: number) => emits('delItem', itemId)"
            @set-ok="(itemId: number, isOk: boolean) => emits('setOk', itemId, isOk)"
            @set-star="(itemId: number, star: boolean) => emits('setStar', itemId, star)"
          />
        </div>
      </template>
      <div
        v-if="!showAddItem && listData.length === 0"
        w-full flex items-center justify-center p-y-2
      >
        <div i-mdi:list-box-outline text-8 c="black/10 dark:#ddd/10" />
      </div>
      <div
        v-if="!otherCate && showAddItem" w="[calc(100%-20px)]"
        bg="black/5 active:black/10" mt-5px flex items-center justify-center rounded-7px
        p-10px
        transition="all 300"
        @click="add"
      >
        <div i-ph:plus-bold />
      </div>
    </div>
  </div>
</template>
