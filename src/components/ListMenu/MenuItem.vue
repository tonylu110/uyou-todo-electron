<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Dropdown as VDropdown } from 'floating-vue'
import { useI18n } from 'vue-i18n'
import Icons from './Icons'

defineProps<{
  id: number
  title: string
  icon?: string
}>()

const emits = defineEmits<{
  delCate: [id: number]
  editCate: [id: number, title: string]
  delWithToDo: [id: number]
  setIcon: [id: number, icon: string]
}>()

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

function toList(listName: string) {
  router.push({
    path: '/other',
    query: {
      listName,
    },
  })
}

const cateText = ref('')
const showEdit = ref(false)

const isOpen = ref(false)

const showIcons = ref(false)
</script>

<template>
  <div
    class="all-todo-list group"
    :bg="route.query.listName === `${id}` ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
    @click="toList(`${id}`)"
  >
    <div>
      <VDropdown
        v-model:shown="showIcons"
        :distance="12"
        :skidding="-12"
        placement="top-start"
      >
        <div
          :class="icon ? icon : 'i-ph:radio-button-bold'" text-18px
          :c="route.query.listName === `${id}` ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
          @click.stop="showIcons = true"
        />
        <template #popper>
          <Icons
            @set-icon="(icon: string) => {
              showIcons = false
              emits('setIcon', id, icon)
            }"
          />
        </template>
      </VDropdown>
      <span
        v-if="!showEdit"
        style="font-size: 14px; margin-left: 10px;"
        :c="route.query.listName === `${id}` ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
      >{{ title }}</span>
      <input
        v-else
        v-model="cateText"
        v-focus
        type="text"
        :c="route.query.listName === `${id}` ? '!white group-hover:!white' : 'group-hover:!white dark:!#bbb'"
        ml-10px p-0 m-0 bg-transparent text-14px
        border-none outline-none font="bold [smartisan-t]"
      >
    </div>
    <div v-if="!showEdit">
      <div
        flex justify-center items-center
        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px" mr-7px
        rounded-xl transition="300 width margin"
        @click.stop="() => {
          showEdit = !showEdit
          cateText = title
        }"
      >
        <div i-ph:pencil-simple-bold :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
      </div>
      <VDropdown
        v-model:shown="isOpen"
        :distance="12"
        placement="top"
      >
        <div
          flex justify-center
          items-center
          :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'" h="18px"
          w="18px" rounded-xl
          transition="300 width margin"
          @click.stop="isOpen = true"
        >
          <div i-ph:trash-simple-bold :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
        </div>
        <template #popper>
          <div p-10px flex="~ col" items-center>
            <span text-14px>{{ t('listMenu.delCate', { title }) }}</span>
            <div flex justify-center items-center mt-10px>
              <button
                bg="white active:#ddd"
                mr-5px border-none rounded-5px
                p="x-10px y-5px" cursor-pointer
                flex justify-center items-center
                shadow="sm black/20" c="#555"
                @click.stop="isOpen = false"
              >
                <div i-mdi:close-thick mr-5px />
                <span>{{ t('cancelText') }}</span>
              </button>
              <button
                bg="!primary-d active:!primary-a"
                border-none rounded-5px cursor-pointer
                p="x-10px y-5px" c="!white"
                flex justify-center items-center
                shadow="sm black/20" mr-5px
                @click.stop="() => {
                  emits('delCate', id)
                  isOpen = false
                }"
              >
                <div i-mdi:check-bold mr-5px />
                <span>{{ t('alertText.returnText') }}</span>
              </button>
              <button
                bg="!error-d active:!error-a"
                border-none rounded-5px cursor-pointer
                p="x-10px y-5px" c="!white"
                flex justify-center items-center
                shadow="sm black/20"
                @click.stop="() => {
                  emits('delWithToDo', id)
                  isOpen = false
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
    <div v-else>
      <div
        flex justify-center items-center
        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px" mr-7px
        rounded-xl transition="300 width margin"
        @click.stop="() => {
          emits('editCate', id, cateText)
          showEdit = false
        }"
      >
        <div i-mdi:check-bold :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
      </div>
      <div
        flex justify-center items-center
        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px"
        rounded-xl transition="300 width margin"
        @click.stop="showEdit = false"
      >
        <div i-mdi:close-thick :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.all-todo-list {
  padding: 10px;
  overflow-x: hidden;
  width: calc(100% - 40px);
  margin-left: 10px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  -webkit-app-region: no-drag;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  span {
    color: #00000090;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>
