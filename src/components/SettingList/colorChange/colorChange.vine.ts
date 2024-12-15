import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import ItemSpace from '../../ItemBox/ItemSpace/ItemSpace.vine'

function ColorChange() {
  const colorMode = ref(localStorage.getItem('colorMode') ? localStorage.getItem('colorMode') : 'system')

  const setColor = (color: string) => {
    ipcRenderer.send('colorMode', color)
    colorMode.value = color
    localStorage.setItem('colorMode', color)
  }

  const simpleMode = localStorage.getItem('simpleMode') === 'true'
  const minWidth = ref(window.innerWidth < 750)
  window.addEventListener('resize', () => {
    minWidth.value = window.innerWidth < 750
  })

  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  return vine`
    <ItemSpace flex="~ !row gap-10px wrap">
      <div
        :bg="colorMode === 'system' ? 'primary-d dark:primary-a' : ''"
        :w="simpleMode ? '98px' : '87px'"
        :h="simpleMode ? '69px' : '59px'"
        border="1px solid #00000020"
        rounded-5px
        flex
        justify-center
        items-center
        cursor-pointer
        @click="setColor('system')"
      >
        <img
          src="./color_mode/light_and_dark.png"
          alt=""
          w="[calc(100%-16px)]"
          h="[calc(100%-16px)]"
          rounded-4px
          border="1px solid #00000020"
        />
      </div>
      <div
        :bg="colorMode === 'light' ? 'primary-d dark:primary-a' : ''"
        :w="simpleMode ? '98px' : '87px'"
        :h="simpleMode ? '69px' : '59px'"
        border="1px solid #00000020"
        rounded-5px
        flex
        justify-center
        items-center
        cursor-pointer
        @click="setColor('light')"
      >
        <img
          :src="isNoteUI ? './images/note/light.png' : './color_mode/light.png'"
          alt=""
          w="[calc(100%-16px)]"
          h="[calc(100%-16px)]"
          rounded-4px
          border="1px solid #00000020"
        />
      </div>
      <div
        :bg="colorMode === 'dark' ? 'primary-d dark:primary-a' : ''"
        :w="simpleMode ? '98px' : '87px'"
        :h="simpleMode ? '69px' : '59px'"
        border="1px solid #00000020"
        rounded-5px
        flex
        justify-center
        items-center
        cursor-pointer
        @click="setColor('dark')"
      >
        <img
          :src="isNoteUI ? './images/note/dark.png' : './color_mode/dark.png'"
          alt=""
          w="[calc(100%-16px)]"
          h="[calc(100%-16px)]"
          rounded-4px
          border="1px solid #00000020"
        />
      </div>
    </ItemSpace>
  `
}

export default ColorChange
