import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import setSwitchFn from '../../../util/setSwitchFn'
import Item from '../../ItemBox/Item/Item.vue'
import firstLoad from '../../TitleBar/firstLoad'

function WindowStateSettings() {
  const { t } = useI18n()

  const titleBarShow = localStorage.getItem('systemTitle') === 'true'

  const saveTopState = ref(localStorage.getItem('saveTopState') === 'true' || localStorage.getItem('saveTopState') === null)
  const saveWindowSizeState = ref(localStorage.getItem('saveWindowSizeState') === 'true')
  const topState = ref(firstLoad())

  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return vine`
    <Item
      v-if="!simpleMode"
      :title="t('setTopState')"
      :show-switch="true"
      :switch-state="saveTopState"
      @switch-fun="
        setSwitchFn(
          'saveTopState',
          !saveTopState,
          () => (saveTopState = !saveTopState),
        )
      "
    />
    <Item
      v-if="titleBarShow || simpleMode"
      :title="t('setTopWindow')"
      :show-switch="true"
      :switch-state="topState"
      @switch-fun="
        setSwitchFn(
          'alwaysOnTop',
          !topState,
          () => (topState = !topState),
          'window-on-top',
        )
      "
    />
    <Item
      v-if="!simpleMode"
      :title="t('saveWindowSize')"
      :show-switch="true"
      :switch-state="saveWindowSizeState"
      @switch-fun="
        setSwitchFn(
          'saveWindowSizeState',
          !saveWindowSizeState,
          () => (saveWindowSizeState = !saveWindowSizeState),
          'setWindowSizeState',
        )
      "
    />
  `
}

export default WindowStateSettings
