import { useRouter } from 'vue-router'
import Item from '../../../components/ItemBox/Item/Item.vue'
import SettingList from '../../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../../components/TabBar/TabBar.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';
import ItemSpace from '../../../components/ItemBox/ItemSpace/ItemSpace.vine';
import ItemButton from '../../../components/ItemBox/ItemButton/ItemButton.vue';
import setSwitchFn from '../../../util/setSwitchFn';

function CustomApi() {
  const { t } = useI18n()
  const router = useRouter()
  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  const useCustomApiUrl = ref(localStorage.getItem('useCustomApiUrl') === 'true')

  const apiUrl = ref(localStorage.getItem('apiUrl') || '')

  function saveCustomApiUrl() {
    localStorage.setItem('apiUrl', apiUrl.value)
  }

  return vine`
    <component
      :is="isNoteUI ? NoteTabBar : TabBar"
      :title="t('vip.setCustApi')"
      :right-img-show="false"
      :left-img-show="true"
      @left-click="router.back()"
    />
    <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
      <Item 
        :title="t('vip.useCustApi')"
        :show-switch="true"
        :switch-state="useCustomApiUrl"
        @switch-fun="setSwitchFn('useCustomApiUrl', !useCustomApiUrl, () => useCustomApiUrl = !useCustomApiUrl)"
      />
      <template v-if="useCustomApiUrl">
        <ItemSpace>
          <input type="text" v-model="apiUrl">
        </ItemSpace>
        <ItemButton mode="primary" @click="saveCustomApiUrl">save</ItemButton>
      </template>
    </SettingList>
  `
}

export default CustomApi