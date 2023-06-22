import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import Item from '../../components/ItemBox/Item/Item.vue'
import setSwitchFn from '../../util/setSwitchFn'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ipcRenderer = require('electron').ipcRenderer
    const router = useRouter()

    const back = () => {
      router.back()
    }

    const opLab = ref(true)
    const openLab = () => {
      opLab.value = !opLab.value
      localStorage.setItem('isInDev', 'false')
    }

    const keyToAdd = ref(localStorage.getItem('ketToAdd') === 'true')

    const simpleMode = localStorage.getItem('simpleMode') === 'true'

    return () => (
      <>
        <TabBar
          title="Laboratory"
          rightImgShow={false}
          leftImgShow={true}
          onLeftClick={back}
          bg-color="light"
        />
        <SettingList>
          <Item
            title="open Laboratory"
            showSwitch={true}
            switchState={opLab.value}
            onSwitchFun={openLab}
          />
          <Item
            title="⚠️ add ToDo item use shortcut"
            showSwitch={true}
            switchState={keyToAdd.value}
            onSwitchFun={() => setSwitchFn('ketToAdd', !keyToAdd.value, () => {
              keyToAdd.value = !keyToAdd.value
              ipcRenderer.send('setAddItemCut', keyToAdd.value)
            })}
          />
          <div text-gray-700 max-w-550px w={simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'} mb-10px select-text>
            ⚠️ This page contains experimental features, may be unstable, and may be removed at any time, for experience only
          </div>
        </SettingList>
      </>
    )
  },
})
