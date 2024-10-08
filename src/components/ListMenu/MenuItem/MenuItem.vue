<script lang="ts" setup>
import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Icons from './Icons/Icons.vine'

defineProps<{
  id: number
  title: string
  icon: string
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
    class="group all-todo-list"
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
          :c="route.query.listName === `${id}` ? '!white !group-hover:white' : 'group-hover:white! !#00000090 !dark:#bbb'"
        />
        <template #popper>
          <Icons
            v-close-popper
            :icon="icon"
            @set-icon="(icon: string) => {
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
        m-0 ml-10px border-none bg-transparent p-0 text-14px outline-none font="bold [smartisan-t]"
      >
    </div>
    <div v-if="!showEdit">
      <div
        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px"
        mr-7px flex items-center justify-center rounded-xl transition="300 width margin"
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
          :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'" h="18px"
          w="18px" flex items-center justify-center rounded-xl
          transition="300 width margin"
        >
          <div i-ph:trash-simple-bold :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
        </div>
        <template #popper>
          <div flex="~ col" items-center p-10px>
            <span text-14px>{{ t('listMenu.delCate', { title }) }}</span>
            <div mt-10px flex items-center justify-center>
              <button
                v-close-popper
                bg="white active:#ddd"
                p="x-10px y-5px"
                mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
                shadow="sm black/20" c="#555"
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
                  emits('delCate', id)
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
                  emits('delWithToDo', id)
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
        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px"
        mr-7px flex items-center justify-center rounded-xl transition="300 width margin"
        @click.stop="() => {
          emits('editCate', id, cateText)
          showEdit = false
        }"
      >
        <div i-mdi:check-bold :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
      </div>
      <div

        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px"
        flex items-center justify-center rounded-xl transition="300 width margin"
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
./Icons/Icons.vine/Icons
