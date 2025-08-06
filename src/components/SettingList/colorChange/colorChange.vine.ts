import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import ItemSpace from '../../ItemBox/ItemSpace/ItemSpace.vine'
import noteDarkImg from '../../../assets/modeImages/note/dark.png'
import noteLightImg from '../../../assets/modeImages/note/light.png'
import normalDarkImg from '../../../assets/modeImages/color_mode/dark.png'
import normalLightImg from '../../../assets/modeImages/color_mode/light.png'

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
    <ItemSpace flex h-auto justify-center items-center>
      <div flex="~ row gap-10px" w-full items-center justify-center>
        <div
          :bg="colorMode === 'system' ? 'primary-d dark:primary-a' : ''"
          w-174px rounded-5px flex justify-center items-center cursor-pointer
          border="1px solid #00000020"
          @click="setColor('system')"
        >
          <img
            src="../../../assets/modeImages/color_mode/light_and_dark.png"
            alt=""
            w="[calc(100%-16px)]"
            :min-w="simpleMode ? '82px' : '71px'"
            object-cover m-2 draggable="false"
            class="rounded-4px"
            border="1px solid #00000020"
          />
        </div>
        <div
          :bg="colorMode === 'light' ? 'primary-d dark:primary-a' : ''"
          w-174px rounded-5px flex justify-center items-center cursor-pointer
          border="1px solid #00000020"
          @click="setColor('light')"
        >
          <img
            :src="isNoteUI ? noteLightImg : normalLightImg"
            alt=""
            w="[calc(100%-16px)]"
            :min-w="simpleMode ? '82px' : '71px'"
            object-cover m-2 draggable="false"
            class="rounded-4px"
            border="1px solid #00000020"
          />
        </div>
        <div
          :bg="colorMode === 'dark' ? 'primary-d dark:primary-a' : ''"
          w-174px rounded-5px flex justify-center items-center cursor-pointer
          border="1px solid #00000020"
          @click="setColor('dark')"
        >
          <img
            :src="isNoteUI ? noteDarkImg : normalDarkImg"
            alt=""
            w="[calc(100%-16px)]"
            :min-w="simpleMode ? '82px' : '71px'"
            object-cover m-2 draggable="false"
            class="rounded-4px"
            border="1px solid #00000020"
          />
        </div>
      </div>
    </ItemSpace>
  `
}

export default ColorChange
