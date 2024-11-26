import { useI18n } from "vue-i18n"

function DeleteAllItem() {
  const { t } = useI18n()

  const emit = vineEmits<{
    delete: []
  }>()

  function deleteAllItem() {
    emit('delete')
  }

  return vine`
    <div v-close-popper flex="~ gap-5px wrap" p="x-6 y-2">
      <div flex="~ col gap-2" items-center justify-center>
        <span text-14px select-none>{{ t('delAllDo') }}</span>
        <div flex>
          <div
            v-close-popper
            bg="primary-d active:primary-a" flex-1
            p="x-10px y-5px" text="!white 12px"
            mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
            shadow="sm black/20" c="#555"
            @click="deleteAllItem"
          >
            <div i-mdi:check-bold mr-5px />
            <span>{{ t('alertText.returnText') }}</span>
          </div>
          <div
            v-close-popper
            bg="black/20 active:black/40" flex-1
            p="x-10px y-5px" text="!black !dark:white 12px"
            mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
            shadow="sm black/20" c="#555"
          >
            <div i-mdi:close-thick mr-5px />
            <span>{{ t('alertText.cancelText') }}</span>
          </div>
        </div>
      </div>
    </div>
  `
}

export default DeleteAllItem