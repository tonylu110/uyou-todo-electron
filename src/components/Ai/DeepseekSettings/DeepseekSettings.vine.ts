import { ref } from 'vue'
import ContextMenu from '../../ContextMenu/ContextMenu.vue'
import Item from '../../ItemBox/Item/Item.vue'
import ItemButton from '../../ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../../ItemBox/ItemText/ItemText.vine'
import { createToast } from '../../Toast'

function DeepseekSettings() {
  const deepseekKey = ref(localStorage.getItem('deepseekKey') || '')

  const models = [
    {
      title: 'deepseek-chat',
      fn: 'c',
      icon: '',
    },
    {
      title: 'deepseek-reasoner',
      fn: 'r',
      icon: '',
    },
  ]
  const useModel = ref(localStorage.getItem('deepseekModel') || '')

  function setModel() {
    localStorage.setItem('deepseekModel', useModel.value)
    localStorage.setItem('deepseekKey', deepseekKey.value)
    createToast({ msg: 'DeepSeek model and key saved successfully!' })
  }

  const showContextMenu = ref(false)
  const contextMenu = ref({
    top: 0,
    left: 0,
  })

  function contextmenuClick(e: MouseEvent) {
    e.preventDefault()

    showContextMenu.value = true

    contextMenu.value = {
      top: e.pageY,
      left: e.pageX,
    }
  }

  return vine`
    <ItemText> Set your DeepSeek API Key </ItemText>
    <ItemSpace @click="showContextMenu = false">
      <input
        type="password"
        placeholder="Enter DeepSeek API Key"
        class="p-2 border-none bg-black/10 outline-none"
        v-model="deepseekKey"
        @contextmenu="contextmenuClick"
      />
    </ItemSpace>
    <Item
      title="choose model"
      :show-list-box="true"
      :list="models"
      :list-box-title="useModel"
      @c="useModel = 'deepseek-chat'"
      @r="useModel = 'deepseek-reasoner'"
    />
    <ItemButton mode="primary" @click="setModel">Save</ItemButton>
    <ContextMenu
      v-if="showContextMenu"
      :pos="contextMenu"
      @paste-text="(text: string) => (deepseekKey = text)"
    />
  `
}

export default DeepseekSettings
