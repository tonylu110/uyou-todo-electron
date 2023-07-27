<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Dropdown as VDropdown } from 'floating-vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  id: number
  title: string
}>()

const emits = defineEmits<{
  delItem: [id: number]
  editItem: [id: number, title: string]
  delWithToDo: [id: number]
}>()

const { t } = useI18n()

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

const isOpen = ref(false)
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
      <VDropdown
        v-model:shown="isOpen"
        :distance="12"
        :positioning-disabled="true"
      >
        <div
          rounded-5px p-5px bg="black/10 dark:#999/10"
          flex items-center justify-center
          @click.stop="isOpen = true"
        >
          <div i-ph:trash-bold text-12px />
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
                  emits('delItem', id)
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
