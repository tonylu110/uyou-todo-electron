import { defineComponent, ref } from "vue";
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from "../../components/SettingList";
import { useRouter } from "vue-router";
import Item from '../../components/ItemBox/Item/Item.vue'

export default defineComponent({
  setup() {
    const router = useRouter()

    const back = () => {
      router.back()
    }

    const opLab = ref(true)
    const openLab = () => {
      opLab.value = !opLab.value
      localStorage.setItem('isInDev', 'false')
    }

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
          <div text-gray-700 max-w-550px w={simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'} mb-10px select-text>
            This page contains experimental features, may be unstable, and may be removed at any time, for experience only
          </div>
        </SettingList>
      </>
    )
  }
})