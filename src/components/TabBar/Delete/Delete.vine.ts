import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DeleteAllItem from '../../DeleteAllItem/DeleteAllItem.vine'

function Delete() {
  const { t } = useI18n()

  const emit = vineEmits<{
    delete: []
  }>()

  const showColor = ref(false)

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
        <DeleteAllItem @delete="emit('delete')"/>
      </template>
    </VDropdown>
  `
}

export default Delete