import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TabBar from '../../../components/TabBar/TabBar.vue'
import SettingList from '../../../components/SettingList'
import ItemBox from '../../../components/ItemBox/ItemBox.vue'
import Item from '../../../components/ItemBox/Item/Item.vue'
import emitter from '../../../util/bus'
import type ListItems from './ListItems'

const ShowListItem: SetupFC = () => {
  const router = useRouter()

  const { t } = useI18n()

  const showList = reactive(localStorage.getItem('listMenuItem')
    ? JSON.parse(localStorage.getItem('listMenuItem')!) as ListItems
    : {
        today: {
          name: 'today',
          show: true,
        },
        star: {
          name: 'star',
          show: true,
        },
        allDo: {
          name: 'completed',
          show: true,
        },
        allNotDo: {
          name: 'incompleted',
          show: true,
        },
      } as ListItems,
  )

  const showAll = ref(Object.keys(showList).map(key => showList[key as keyof ListItems].show).every(t => t))

  watch(
    showList,
    (newValue) => {
      showAll.value = Object.keys(newValue).map(key => newValue[key as keyof ListItems].show).every(t => t)
    },
  )

  return () => (
    <>
      <TabBar
        title={t('custListItem')}
        rightImgShow={false}
        leftImgShow={true}
        onLeftClick={() => router.back()}
        bg-color="light"
      />
      <SettingList>
        <Item
          title={t('custList.showAll')}
          showSwitch={true}
          switchState={showAll.value}
          onSwitchFun={() => {
            Object.keys(showList).forEach((key) => {
              showList[key as keyof ListItems].show = !showAll.value
            })
            localStorage.setItem('listMenuItem', JSON.stringify(showList))
            emitter.emit('setListItem', showList)
          }}
        />
        <ItemBox>
          {Object.keys(showList).map(key =>
          <Item
            title={t(`custList.${showList[(key as keyof ListItems)].name}`)}
            showSwitch={true}
            switchState={showList[(key as keyof ListItems)].show}
            onSwitchFun={() => {
              showList[(key as keyof ListItems)].show = !showList[(key as keyof ListItems)].show
              localStorage.setItem('listMenuItem', JSON.stringify(showList))
              emitter.emit('setListItem', showList)
            }
          } />)}
        </ItemBox>
      </SettingList>
    </>
  )
}

export default ShowListItem
