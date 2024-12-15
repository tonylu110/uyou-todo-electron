import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isLinux } from '../../util/os'
import setSwitchFn from '../../util/setSwitchFn'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'
import isNoteUI from './util/isNoteUI'

function AppUseSettings() {
  const { t } = useI18n()

  const autoStartState = ref(localStorage.getItem('autoStart') === 'true')

  const startPageList = [
    {
      title: t('startPage.allTodos'),
      fn: 'home',
      icon: 'i-ph:list-bullets-bold',
    },
    {
      title: t('startPage.today'),
      fn: 'today',
      icon: 'i-ph:sun-bold',
    },
  ]
  const startPage = computed(() => startPageList.filter(item => item.fn === (localStorage.getItem('start') ? localStorage.getItem('start') : 'home'))[0].title)
  function setStartPage(StartPage: string) {
    localStorage.setItem('start', StartPage)
  }

  return vine`
    <ItemBox v-if="!(isNoteUI && isLinux())">
      <Item
        v-if="!isNoteUI"
        icon="i-icon-park:web-page"
        :title="t('startPage.startPage')"
        :show-list-box="true"
        :list-box-title="startPage"
        :list="startPageList"
        @home="setStartPage('home')"
        @today="setStartPage('today')"
      />
      <Item
        v-if="!isLinux()"
        icon="i-icon-park:computer"
        :title="t('anotherSettings.autoStart')"
        :show-switch="true"
        :switch-state="autoStartState"
        @switch-fun="
          setSwitchFn(
            'autoStart',
            !autoStartState,
            () => (autoStartState = !autoStartState),
            'setAutoStart',
          )
        "
      />
    </ItemBox>
  `
}

export default AppUseSettings
