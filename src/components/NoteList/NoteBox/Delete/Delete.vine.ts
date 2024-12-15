import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DeleteAllItem from '../../../DeleteAllItem/DeleteAllItem.vine'

function Delete() {
  const emit = vineEmits<{
  delete: []
  }>()

  return vine`
    <VDropdown :distance="12" placement="top">
      <div>
        <div i-ph:trash-bold block />
      </div>
      <template #popper>
        <DeleteAllItem @delete="emit('delete')" />
      </template>
    </VDropdown>
  `
}

export default Delete
