import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../../../components/TabBar/TabBar.vue'
import SettingList from '../../../components/SettingList'
import ItemBox from '../../../components/ItemBox/ItemBox.vue'
import Item from '../../../components/ItemBox/Item/Item.vue'
import i18n from '../../../i18n'
import emitter from '../../../util/bus'
import type ListItems from './ListItems'

export default defineComponent({
  setup() {
    const router = useRouter()

    const showList: ListItems = reactive(localStorage.getItem('listMenuItem')
      ? JSON.parse(localStorage.getItem('listMenuItem')!) as ListItems
      : {
          today: {
            name: i18n().startPage.today,
            show: true,
          },
          star: {
            name: 'Star ToDos',
            show: true,
          },
          allDo: {
            name: i18n().listMenu.completed,
            show: true,
          },
          allNotDo: {
            name: i18n().listMenu.incompleted,
            show: true,
          },
        })

    return () => (
      <>
        <TabBar
          title="⚠️ Set List Item"
          rightImgShow={false}
          leftImgShow={true}
          onLeftClick={() => router.back()}
          bg-color="light"
        />
        <SettingList>
          <ItemBox>
            {Object.keys(showList).map(key =>
            <Item
              title={showList[(key as keyof ListItems)].name}
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
  },
})
