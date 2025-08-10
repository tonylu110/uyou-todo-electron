import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isLinux, isMac, isMacosTahoe, isWin11, isWindows10OrAfter } from '../../../util/os'
import setSwitchFn from '../../../util/setSwitchFn'
import Item from '../../ItemBox/Item/Item.vue'
import { createToast } from '../../Toast'

function WindowStyleSettings() {
  const { t } = useI18n()

  const titleBarShow = localStorage.getItem('systemTitle') === 'true'

  const useSystemTitleBar = ref(localStorage.getItem('systemTitle') === 'true')
  const menuBlurState = ref(localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null)
  const showWindowMenuState = ref(localStorage.getItem('windowMenu') === 'true')

  function changeMica(effect: string) {
    ipcRenderer.send('changeBlur', effect)
  }

  function changeLiquidGlass(effect: string) {
    ipcRenderer.send('setLiquid', effect)
    createToast({ msg: t('restartApp') })
  }

  const minWidth = ref(window.innerWidth < 750)
  window.addEventListener('resize', () => {
    minWidth.value = window.innerWidth < 750
  })

  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  vineStyle.scoped(scss`
    .item-blur {
      position: relative;
      width: calc(100vw - 450px);
      min-height: 30px;
      height: 30px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
    
      div {
        width: 130px;
        text-align: center;
        height: 2em;
        line-height: 2em;
        border-radius: 5px;
        border: 1px solid #00000015;
        cursor: pointer;
        font-size: 14px;
      }
    }
  `)

  return vine`
    <Item
      :title="t('useSystemBar')"
      :show-switch="true"
      :switch-state="useSystemTitleBar"
      @switch-fun="
        setSwitchFn(
          'systemTitle',
          !useSystemTitleBar,
          () => (useSystemTitleBar = !useSystemTitleBar),
          'setSystemBar',
          t('restartApp'),
        )
      "
    />
    <Item
      v-if="titleBarShow && !isMac() && !simpleMode"
      :title="t('anotherSettings.windowMenu')"
      :show-switch="true"
      :switch-state="showWindowMenuState"
      @switch-fun="
        setSwitchFn(
          'windowMenu',
          !showWindowMenuState,
          () => (showWindowMenuState = !showWindowMenuState),
          'setWindowMenu',
        )
      "
    />
    <Item
      v-if="(!isLinux() && isWindows10OrAfter()) || isMac()"
      :title="t('anotherSettings.menuBlur')"
      :show-switch="true"
      :switch-state="menuBlurState"
      @switch-fun="
        setSwitchFn(
          'menuBlur',
          !menuBlurState,
          () => (menuBlurState = !menuBlurState),
          'setMenuBlur',
          t('restartApp'),
        )
      "
    />
    <div
      v-if="isWin11() && menuBlurState && !simpleMode"
      class="item item-blur"
      :max-w="minWidth ? '' : '550px'"
      bg="white dark:#999/10"
    >
      <div
        c="black dark:#bbb active:white"
        bg="active:primary-d dark:active:primary-a"
        @click="changeMica('mica')"
      >
        Mica Effect
      </div>
      <div
        c="black dark:#bbb active:white"
        bg="active:primary-d dark:active:primary-a"
        @click="changeMica('tabbed')"
      >
        Mica Tabbed
      </div>
      <div
        c="black dark:#bbb active:white"
        bg="active:primary-d dark:active:primary-a"
        @click="changeMica('acrylic')"
      >
        Acrylic
      </div>
    </div>
    <div
      v-if="isMacosTahoe() && menuBlurState && !simpleMode"
      class="item item-blur"
      :max-w="minWidth ? '' : '550px'"
      bg="white dark:#999/10"
    >
      <div
        c="black dark:#bbb active:white"
        bg="active:primary-d dark:active:primary-a"
        @click="changeLiquidGlass('blur')"
      >
        Blur
      </div>
      <div
        c="black dark:#bbb active:white"
        bg="active:primary-d dark:active:primary-a"
        @click="changeLiquidGlass('liquid')"
      >
        Liquid Glass
      </div>
      <div
        c="black dark:#bbb active:white"
        bg="active:primary-d dark:active:primary-a"
        @click="changeLiquidGlass('liquidBlur')"
      >
        Blur Liquid Glass
      </div>
    </div>
  `
}

export default WindowStyleSettings
