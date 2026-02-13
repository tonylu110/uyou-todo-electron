import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ContextMenu from '../../ContextMenu/ContextMenu.vue'
import Item from '../../ItemBox/Item/Item.vue'
import ItemButton from '../../ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../../ItemBox/ItemText/ItemText.vine'
import { createToast } from '../../Toast'

function DeepseekSettings() {
  const { t } = useI18n()

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
    <ItemText> {{ t('ai.deepseekKey') }} </ItemText>
    <ItemSpace @click="showContextMenu = false">
      <input
        type="password"
        :placeholder="t('ai.deepseekKeyPlaceholder')"
        class="p-2 border-none bg-black/10 outline-none"
        v-model="deepseekKey"
        @contextmenu="contextmenuClick"
      />
    </ItemSpace>
    <Item
      :title="t('ai.chooseModel')"
      :show-list-box="true"
      :list="models"
      :list-box-title="useModel"
      @c="useModel = 'deepseek-chat'"
      @r="useModel = 'deepseek-reasoner'"
    />
    <ItemButton mode="primary" @click="setModel">{{ t('save') }}</ItemButton>
    <ContextMenu
      v-if="showContextMenu"
      :pos="contextMenu"
      @paste-text="(text: string) => (deepseekKey = text)"
    />
  `
}

export default DeepseekSettings
