<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps<{
  id: number
  title: string
}>()

const emits = defineEmits<{
  delCate: [id: number]
  editCate: [id: number, title: string]
}>()

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
</script>

<template>
  <div
    class="all-todo-list group"
    :bg="route.query.listName === `${id}` ? 'primary-d hover:primary-a dark:primary-a' : 'hover:primary-d dark:hover:primary-a'"
    @click="toList(`${id}`)"
  >
    <div>
      <div
        i-ph:radio-button-bold text-18px
        :c="route.query.listName === `${id}` ? 'white group-hover:white' : 'group-hover:white #00000090 dark:#bbb'"
      />
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
      <div
        flex justify-center items-center
        :bg="route.query.listName === `${id}` ? 'white/20 hover:white/30 active:whitem/40' : 'black/5 hover:black/10 active:black/15 group-hover:white/20'"
        h="18px" w="18px"
        rounded-xl transition="300 width margin"
        @click.stop="emits('delCate', id)"
      >
        <div i-ph:trash-simple-bold :c="route.query.listName === `${id}` ? 'white dark:#bbb' : '#555 dark:#bbb group-hover:white'" text-12px />
      </div>
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
