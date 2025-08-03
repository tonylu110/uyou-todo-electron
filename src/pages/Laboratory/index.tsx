import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Item from '../../components/ItemBox/Item/Item.vue'
import ItemText from '../../components/ItemBox/ItemText/ItemText.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import TabBar from '../../components/TabBar/TabBar.vue'
import { createToast } from '../../components/Toast'
import { useModeStore } from '../../store/modeStore'
import setSwitchFn from '../../util/setSwitchFn'

const Laboratory: SetupFC = () => {
  const router = useRouter()

  const { t } = useI18n()

  const modeStore = useModeStore()

  const opLab = ref(true)
  const openLab = () => {
    opLab.value = !opLab.value
    localStorage.setItem('isInDev', 'false')
  }

  const keyToAdd = ref(localStorage.getItem('ketToAdd') === 'true')

  const devClick = ref(0)
  const setDev = () => {
    if (devClick.value < 5) {
      devClick.value++
      createToast({ msg: `click ${5 - devClick.value} times to set dev mode` })
      return
    }
    modeStore.setDevMode(!modeStore.isDev)
    createToast({ msg: `dev mode ${modeStore.isDev ? 'on' : 'off'}` })
    devClick.value = 0
  }

  // const newFloatUi = ref(localStorage.getItem('newFloatUi') === 'true')

  // const newNoteUI = ref(localStorage.getItem('newNoteUI') === 'true')

  return () => (
    <>
      <TabBar
        title={t('anotherSettings.laboratory')}
        rightImgShow={false}
        leftImgShow={true}
        onLeftClick={() => router.back()}
        bg-color="light"
      />
      <SettingList>
        <Item
          title="open Laboratory"
          showSwitch={true}
          switchState={opLab.value}
          onSwitchFun={openLab}
          onItemFun={setDev}
        />
        {/* <ItemBox>
          <Item
            title="⚠️ new float ui - Only for Default mode"
            showSwitch={true}
            switchState={newFloatUi.value}
            onSwitchFun={() => setSwitchFn('newFloatUi', !newFloatUi.value, () => {
              newFloatUi.value = !newFloatUi.value
              emitter.emit('setNewFloatUi')
            })}
          />
          <Item title='⚠️ set whitch item in siderbar' onItemFun={() => router.push('/setListItem?from=setting')}/>
        </ItemBox> */}
        {/* <Item
          title="⚠️ set font - can't use"
          onItemFun={() => router.push('/fontSet?from=setting')}
        /> */}
        <Item
          title="⚠️ add ToDo item use shortcut"
          showSwitch={true}
          switchState={keyToAdd.value}
          onSwitchFun={() => setSwitchFn('ketToAdd', !keyToAdd.value, () => keyToAdd.value = !keyToAdd.value, 'setAddItemCut')}
        />
        {/* <Item
          title="⚠️ new Note UI"
          showSwitch={true}
          switchState={newNoteUI.value}
          onSwitchFun={() => setSwitchFn('newNoteUI', !newNoteUI.value, () => newNoteUI.value = !newNoteUI.value)}
        /> */}
        <ItemText>
          ⚠️ This page contains experimental features, may be unstable, and may be removed at any time, for experience only
        </ItemText>
      </SettingList>
    </>
  )
}

export default Laboratory
