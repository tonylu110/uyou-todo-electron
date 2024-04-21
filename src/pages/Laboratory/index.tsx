import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import Item from '../../components/ItemBox/Item/Item.vue'
import setSwitchFn from '../../util/setSwitchFn'
import ItemText from '../../components/ItemBox/ItemText'

const Laboratory: SetupFC = () => {
  const router = useRouter()

  const { t } = useI18n()

  const opLab = ref(true)
  const openLab = () => {
    opLab.value = !opLab.value
    localStorage.setItem('isInDev', 'false')
  }

  const keyToAdd = ref(localStorage.getItem('ketToAdd') === 'true')

  // const newFloatUi = ref(localStorage.getItem('newFloatUi') === 'true')

  const newNoteUI = ref(localStorage.getItem('newNoteUI') === 'true')

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
        <Item
          title="⚠️ new Note UI"
          showSwitch={true}
          switchState={newNoteUI.value}
          onSwitchFun={() => setSwitchFn('newNoteUI', !newNoteUI.value, () => newNoteUI.value = !newNoteUI.value)}
        />
        <ItemText>
          ⚠️ This page contains experimental features, may be unstable, and may be removed at any time, for experience only
        </ItemText>
      </SettingList>
    </>
  )
}

export default Laboratory
