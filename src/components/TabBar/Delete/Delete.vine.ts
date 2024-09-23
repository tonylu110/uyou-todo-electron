import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

function Delete() {
  const { t } = useI18n()

  const emit = vineEmits<{
    changeColor: [color: string | null]
  }>()

  const showColor = ref(false)

  function changColor(color: string | null) {
    emit('changeColor', color)
  }

  return vine`
    <VDropdown
      v-model:shown="showColor"
      :distance="12"
      placement="bottom-end"
    >
      <div
        bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
        w-20px cursor-pointer rounded-5px p-5px no-drag
      >
        <div c="#555 dark:#bbb" i-ph:trash-bold block text-20px />
      </div>
      <template #popper>
        <div v-close-popper flex="~ gap-5px wrap" p="x-6 y-2">
          <div flex="~ col gap-2" items-center justify-center>
            <span text-14px>{{ t('delAllDo') }}</span>
            <div flex>
              <button
                v-close-popper
                bg="primary-d active:primary-a" flex-1
                p="x-10px y-5px" text="!white 12px"
                mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
                shadow="sm black/20" c="#555"
              >
                <div i-mdi:check-bold mr-5px />
                <span>{{ t('alertText.returnText') }}</span>
              </button>
              <button
                v-close-popper
                bg="black/20 active:black/40" flex-1
                p="x-10px y-5px" text="!black !dark:white 12px"
                mr-5px flex cursor-pointer items-center justify-center rounded-5px border-none
                shadow="sm black/20" c="#555"
              >
                <div i-mdi:close-thick mr-5px />
                <span>{{ t('alertText.cancelText') }}</span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </VDropdown>
  `
}

export default Delete