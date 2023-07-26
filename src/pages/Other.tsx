import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TabBar from '../components/TabBar/TabBar.vue'
import List from '../components/List/List.vue'
import LocalStorage from '../util/localStorage'
import type ITodoList from '../interface/ITodoListArray'
import type { cateItem } from '../components/ListMenu/ICateItem'

const Other: SetupFC = () => {
  const { t } = useI18n()

  const title = ref('')

  const listData: Ref<ITodoList[]> = ref([])

  const route = useRoute()
  const router = useRouter()
  const list = ref(LocalStorage('get'))

  const showAddItem = ref(false)

  watchEffect(() => {
    if (route.query.listName === 'allNotDo') {
      listData.value = list.value!.filter(listData => listData.ok === false)
      title.value = t('listMenu.incompleted')
    }
    else if (route.query.listName === 'allDo') {
      listData.value = list.value!.filter(listData => listData.ok === true)
      title.value = t('listMenu.completed')
    }
    else if (route.query.listName === 'today') {
      listData.value = list.value!.filter(listData => new Date(listData.id).toDateString() === new Date().toDateString())
      title.value = t('startPage.today')
    }
    else if (route.query.listName === 'star') {
      listData.value = list.value!.filter(listData => listData.star === true)
      title.value = t('listMenu.star')
    }
    else {
      listData.value = list.value!.filter(listData => listData.cate === route.query.listName)
      const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
      if (route.name === 'other')
        title.value = JSON.parse(localCateList!).data.filter((cate: cateItem) => `${cate.id}` === route.query.listName)[0].title
    }
  })

  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return () => (
    <>
      <TabBar
        leftImg="i-ph:gear-fine-bold"
        title={title.value}
        leftImgShow={simpleMode}
        rightImgShow={route.query.listName !== 'allNotDo' && route.query.listName !== 'allDo' && route.query.listName !== 'star'}
        onRightClick={() => showAddItem.value = !showAddItem.value}
        onLeftClick={() => router.push('/setting-sim')}
        showMore={true}
        showWrap={true}
      />
      <List
        showAddItem={showAddItem.value}
        listData={listData.value}
        onSetAddItem={() => showAddItem.value = false}
      />
    </>
  )
}

export default Other
