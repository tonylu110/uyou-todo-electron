import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'

function Delete() {
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
      placement="bottom"
    >
      <div
        bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
        w-20px cursor-pointer rounded-5px p-5px no-drag
      >
        <div c="#555 dark:#bbb" i-ph:trash-bold block text-20px />
      </div>
      <template #popper>
        <div v-close-popper flex="~ gap-5px wrap" max-w-120px p-10px>
          Delete All
        </div>
      </template>
    </VDropdown>
  `
}

export default Delete