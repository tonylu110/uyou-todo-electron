<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  id: number
  title: string
}>()

const emits = defineEmits<{
  delItem: [id: number]
  editItem: [id: number, title: string]
}>()

const router = useRouter()

function toList(listName: string) {
  router.push({
    path: '/other',
    query: {
      listName,
    },
  })
}

const showEdit = ref(false)
const cateTitle = ref('')
</script>

<template>
  <div
    p-10px w="[calc(100vw-20px)]"
    text-center text-18px relative
    flex items-center justify-center
    bg="hover:black/5 active:black/10"
    @click="toList(`${id}`)"
  >
    <span v-if="!showEdit">{{ title }}</span>
    <div v-else relative>
      <span c-transparent>{{ cateTitle }}</span>
      <input
        v-model="cateTitle"
        v-focus
        type="text"
        p-0 m-0 text-14px w="100%" absolute
        border-none outline-none font="bold [smartisan-t]"
        c="#555 dark:#bbb" text-18px left-0 bg-transparent
      >
    </div>
    <div
      v-if="!showEdit"
      absolute right-10px
      flex justify-center items-center
    >
      <div
        rounded-5px p-5px bg="black/10 dark:#999/10"
        flex items-center justify-center mr-6px
        @click.stop="() => {
          showEdit = true
          cateTitle = title
        }"
      >
        <div i-ph:pencil-simple-bold text-12px />
      </div>
      <div
        rounded-5px p-5px bg="black/10 dark:#999/10"
        flex items-center justify-center
        @click.stop="emits('delItem', id)"
      >
        <div i-ph:trash-bold text-12px />
      </div>
    </div>
    <div
      v-else
      absolute right-10px
      flex justify-center items-center
    >
      <div
        rounded-5px p-5px bg="black/10 dark:#999/10"
        flex items-center justify-center mr-6px
        @click.stop="() => {
          emits('editItem', id, cateTitle)
          showEdit = false
        }"
      >
        <div i-mdi:check-bold text-12px />
      </div>
      <div
        rounded-5px p-5px bg="black/10 dark:#999/10"
        flex items-center justify-center
        @click.stop="showEdit = false"
      >
        <div i-mdi:close-thick text-12px />
      </div>
    </div>
  </div>
</template>
