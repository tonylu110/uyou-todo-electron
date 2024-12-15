import { isMac } from '../../../util/os'
import ItemBox from '../../ItemBox/ItemBox.vue'
import CloseWindowSettings from './CloseWindowSettings.vine'
import WindowStateSettings from './WindowStateSettings.vine'
import WindowStyleSettings from './WindowStyleSettings.vine'

function WindowSettings() {
  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return vine`
    <ItemBox>
      <CloseWindowSettings v-if="!isMac() && !simpleMode" />
      <WindowStyleSettings />
      <WindowStateSettings />
    </ItemBox>
  `
}

export default WindowSettings
