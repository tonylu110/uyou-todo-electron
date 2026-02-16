import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import DeepseekSettings from '../../components/Ai/DeepseekSettings/DeepseekSettings.vine'
import OllamaSettings from '../../components/Ai/OllamaSettings/OllamaSettings.vine'
import Item from '../../components/ItemBox/Item/Item.vue'
import SettingList from '../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import setSwitchFn from '../../util/setSwitchFn'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue';
import { ipcRenderer } from 'electron'

function ToDoBackup() {
  const { t } = useI18n()
  const router = useRouter()
  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  const useAI = ref(localStorage.getItem('useAI') === 'true')
  const modelProviders = [{
    title: 'Ollama',
    fn: 'ollama',
    icon: 'i-icon-park-outline:ollama',
  }, {
    title: 'DeepSeek',
    fn: 'deepseek',
    icon: 'i-icon-park-outline:deepseek',
  }]

  const useProvider = ref(localStorage.getItem('modelProvider') || '')
  function setProvider(provider: string) {
    useProvider.value = provider
    localStorage.setItem('modelProvider', provider)
  }

  function openAiWindow() {
    ipcRenderer.send('open-ai')
  }

  return vine`
    <component
      :is="isNoteUI ? NoteTabBar : TabBar"
      :title="t('anotherSettings.ai')"
      :right-img-show="false"
      :left-img-show="true"
      :show-beta="true"
      :use-ai-bg="true"
      @left-click="router.back()"
    />
    <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'" @get-scroll="() => {}">
      <Item
        icon="i-ph:star-four-bold"
        :useAIBg="true"
        :title="t('ai.start')"
        :show-switch="true"
        :switch-state="useAI"
        @switch-fun="setSwitchFn('useAI', !useAI, () => (useAI = !useAI))"
      />
      <template v-if="useAI">
        <Item
          :title="t('ai.choose')"
          :show-list-box="true"
          :list="modelProviders"
          :list-box-title="useProvider"
          @ollama="setProvider('ollama')"
          @deepseek="setProvider('deepseek')"
        />
        <OllamaSettings v-if="useProvider === 'ollama'" />
        <DeepseekSettings v-if="useProvider === 'deepseek'" />
      </template>
      <ItemButton @click="openAiWindow">open ai window</ItemButton>
    </SettingList>
  `
}

export default ToDoBackup
