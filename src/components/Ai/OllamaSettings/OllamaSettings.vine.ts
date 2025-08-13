import { ref } from 'vue'
import Item from '../../ItemBox/Item/Item.vue'
import ItemButton from '../../ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../../ItemBox/ItemText/ItemText.vine'
import { createToast } from '../../Toast'

function OllamaSettings() {
  const ollamaApi = ref(localStorage.getItem('ollamaApi') || '')

  const models = ref([])
  const useModel = ref(localStorage.getItem('ollamaModel') || '')

  function setModel() {
    localStorage.setItem('ollamaModel', useModel.value)
    localStorage.setItem('ollamaApi', ollamaApi.value)
    createToast({ msg: 'saved successfully!' })
  }

  return vine`
    <ItemText> Set your Ollama API link </ItemText>
    <ItemSpace>
      <input
        type="password"
        placeholder="Enter Ollama API link"
        class="p-2 border-none bg-black/10 outline-none"
        v-model="ollamaApi"
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
  `
}

export default OllamaSettings
