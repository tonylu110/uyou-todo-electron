import { useI18n } from 'vue-i18n'
import CloseButton from '../../../../src/components/CloseButton/CloseButton.vine'
import { isMac } from '../../../../src/util/os'
import { closeWindow } from '../../../../src/util/windowApi'
import win95icon from '../../assets/win95.png'

function TitleBar() {
  const isWin95 = vineProp<boolean>()

  const { t } = useI18n()

  vineStyle.scoped(scss`
    .win95-button {
      background: silver;
      border: none;
      border-radius: 0;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
      box-sizing: border-box;
      color: transparent;
      padding: 4px;
      text-shadow: 0 0 #222;
      display: flex;
      justify-content: center;
      align-items: center;
    
      &:active {
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
      text-shadow: 1px 1px #222;
      }
    }
  `)

  return vine`
    <div
      v-if="isWin95"
      class="fixed top-0 left-0 p-1 flex items-center justify-between"
      bg="#000e7a"
      w="[calc(100%-8px)]"
    >
      <div c="#fefefe" text="shadow 3" class="h-4 flex items-center">
        <img :src="win95icon" alt="" class="h-full mx-1" />
        <span>{{ t('anotherSettings.about') }}</span>
      </div>
      <div>
        <button class="win95-button no-drag" @click="closeWindow('about')">
          <div class="i-ph:x-bold c-black" />
        </button>
      </div>
    </div>
    <CloseButton v-if="!isMac() && isWin95" windowName="about" />
  `
}

export default TitleBar
