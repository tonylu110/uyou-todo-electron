<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { Dropdown as VDropdown } from 'floating-vue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCateStore } from '../../../store/cateStore'
import { useTodoStore } from '../../../store/todoStore'
import Delete from './Delete/Delete.vine'
import Edit from './Edit/Edit.vue'
import Item from './Item/Item.vue'

interface Props {
  title: string
  id?: number | string
  color?: string | null
  icon?: string
  otherCate?: boolean
  showAddItem?: boolean
  showBtn?: boolean
  showDelete?: boolean
  isWindow?: boolean
}

const { title = 'title', color = 'primary-d', showAddItem = true, showBtn = true, showDelete = false, id, isWindow = false } = defineProps<Props>()
const todoStore = useTodoStore()
const cateStore = useCateStore()
const { t } = useI18n()

const listData = computed(() => {
  const todos = todoStore.todoList.data
  if (id === 'today') {
    return todos.filter(todo =>
      new Date(todo.id).toDateString() === new Date().toDateString()
        || new Date(todo.time!).toDateString() === new Date().toDateString(),
    )
  }
  else if (id === 'star') {
    return todos.filter(todo => todo.star)
  }
  else if (id === 'allNotDo') {
    return todos.filter(todo => !todo.ok)
  }
  else if (id === 'allDo') {
    return todos.filter(todo => todo.ok)
  }
  else {
    return todos.filter(todo => todo.cate === `${id}`)
  }
})

const otherList = computed(() =>
  todoStore.todoList.data.filter(todo => todo.cate === undefined),
)

const isOpen = ref(false)
const showAdd = ref(false)
const itemText = ref('')

async function add() {
  if (!id || !itemText.value)
    return

  await todoStore.addTodo({
    ok: false,
    id: new Date().getTime(),
    text: itemText.value,
    cate: `${id}`,
  })

  showAdd.value = false
  itemText.value = ''
}

async function deleteCate(categoryId: number | string) {
  await cateStore.deleteCategory(categoryId)
}

async function deleteWithTodos(categoryId: number | string) {
  await cateStore.deleteCategoryWithTodos(categoryId)
}

async function deleteTodo(todoId: number) {
  await todoStore.deleteTodo(todoId)
}

async function setTodoOk(todoId: number, isOk: boolean) {
  await todoStore.updateTodo(todoId, { ok: isOk })
}

async function editCategory(categoryId: number | string, name: string, icon: string, color: string | null) {
  await cateStore.updateCategory(categoryId, {
    title: name,
    icon,
    color,
  })
}

async function editTodoItem(todoId: number, title: string, cateId: number | string) {
  await todoStore.updateTodo(todoId, {
    text: title,
    cate: `${cateId}`,
  })
}

async function setTodoStar(todoId: number, star: boolean) {
  await todoStore.updateTodo(todoId, { star })
}

async function deleteAllCompleted() {
  const completedTodos = todoStore.todoList.data.filter(todo => todo.ok)
  for (const todo of completedTodos) {
    await todoStore.deleteTodo(todo.id)
  }
}

function openNew() {
  ipcRenderer.send('open-desktopNote', id)
}

const noteBox = ref<HTMLElement>()
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (!noteBox.value || !isWindow)
        return
      ipcRenderer.send('getContentHeight', entry.target.clientHeight + 64)
    }
  })

  resizeObserver.observe(noteBox.value!)
})
</script>

<template>
  <div
    ref="noteBox" mb-30px break-inside-avoid rounded-10px bg="white dark:#333"
    drop-shadow-md
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
        flex="~ gap-5px" w="0 hover:56px" transition="all 300"
        items-center overflow-hidden p="r-10px l-5px" op="0 hover:100"
      >
        <div @click="openNew">
          <div i-ph:app-window-bold block />
        </div>
        <Edit
          :color
          :icon
          :name="title"
          @edit="(name: string, icon: string, color: string | null) => editCategory(id!, name, icon, color)"
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
                  @click.stop="() => deleteCate(id!)"
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
                  @click.stop="() => deleteWithTodos(id!)"
                >
                  <div i-ph:warning-circle-bold mr-5px />
                  <span>{{ t('listMenu.delTodo') }}</span>
                </button>
              </div>
            </div>
          </template>
        </VDropdown>
      </div>
      <div
        v-else-if="showDelete"
        flex="~ gap-5px" w="0 hover:14px" transition="all 300"
        items-center overflow-hidden p="r-10px l-5px" op="0 hover:100"
      >
        <Delete @delete="deleteAllCompleted" />
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
            @edit="(itemId: number, title: string, cateId: string | number) => editTodoItem(itemId, title, cateId)"
            @del="(itemId: number) => deleteTodo(itemId)"
            @set-ok="(itemId: number, isOk: boolean) => setTodoOk(itemId, isOk)"
            @set-star="(itemId: number, star: boolean) => setTodoStar(itemId, star)"
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
            @edit="(itemId: number, title: string, cateId: string | number) => editTodoItem(itemId, title, cateId)"
            @del="(itemId: number) => deleteTodo(itemId)"
            @set-ok="(itemId: number, isOk: boolean) => setTodoOk(itemId, isOk)"
            @set-star="(itemId: number, star: boolean) => setTodoStar(itemId, star)"
          />
        </div>
      </template>
      <div
        v-if="!showAddItem && listData.length === 0 && !showAdd"
        w-full flex items-center justify-center p-y-2
      >
        <div i-mdi:list-box-outline text-8 c="black/10 dark:#ddd/10" />
      </div>
      <div v-if="showAdd">
        <textarea
          v-model="itemText"
          w="[calc(100%-20px)]"
          bg="black/5 active:black/10"
          mt-5px rounded-7px border-none p-10px outline-none
        />
        <div w-full flex="~ gap-5px">
          <button
            v-if="itemText"
            flex-1 rounded-7px border-none p-2 outline-none :bg="color"
            @click="add"
          >
            <div i-ph:check-bold c-white />
          </button>
          <button
            flex-1 rounded-7px border-none p-2
            outline-none bg="error-d active:error-a"
            @click="() => {
              showAdd = false
              itemText = ''
            }"
          >
            <div i-ph:x-bold c-white />
          </button>
        </div>
      </div>
      <div
        v-if="!otherCate && showAddItem && !showAdd" w="[calc(100%-20px)]"
        bg="black/5 active:black/10" mt-5px flex items-center justify-center rounded-7px
        p-10px
        transition="all 300"
        @click="showAdd = true"
      >
        <div i-ph:plus-bold dark:c-white />
      </div>
    </div>
  </div>
</template>
