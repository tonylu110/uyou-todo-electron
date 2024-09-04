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
    w="[calc(100vw-20px)]"

    relative flex items-center justify-center p-10px text-center text-18px
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
        w="100%"
        font="bold [smartisan-t]"
        c="#555 dark:#bbb" absolute left-0 m-0 border-none bg-transparent p-0 text-14px text-18px outline-none
      >
    </div>
    <div
      v-if="!showEdit"

      absolute right-10px flex items-center justify-center
    >
      <div
        bg="black/10 dark:#999/10"
        mr-6px flex items-center justify-center rounded-5px p-5px
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
          v-close-popper
          bg="black/10 dark:#999/10"
          flex items-center justify-center rounded-5px p-5px
        >
          <div i-ph:trash-bold text-12px />
        </div>
        <template #popper>
          <div flex="~ col" items-center p-10px>
            <span text-14px>{{ t('listMenu.delCate', { title }) }}</span>
            <div mt-10px flex items-center justify-center>
              <button
                bg="white active:#ddd"

                p="x-10px y-5px"
                mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
                shadow="sm black/20" c="#555"
                @click.stop="isOpen = false"
              >
                <div i-mdi:close-thick mr-5px />
                <span>{{ t('cancelText') }}</span>
              </button>
              <button
                v-close-popper
                bg="!primary-d active:!primary-a"
                p="x-10px y-5px" c="!white"
                shadow="sm black/20" mr-5px flex cursor-pointer items-center justify-center
                rounded-5px border-none
                @click.stop="() => {
                  emits('delItem', id)
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
    <div
      v-else

      absolute right-10px flex items-center justify-center
    >
      <div
        bg="black/10 dark:#999/10"
        mr-6px flex items-center justify-center rounded-5px p-5px
        @click.stop="() => {
          emits('editItem', id, cateTitle)
          showEdit = false
        }"
      >
        <div i-mdi:check-bold text-12px />
      </div>
      <div
        bg="black/10 dark:#999/10"
        flex items-center justify-center rounded-5px p-5px
        @click.stop="showEdit = false"
      >
        <div i-mdi:close-thick text-12px />
      </div>
    </div>
  </div>
</template>
