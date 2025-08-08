import type { cateItem } from '../components/ListMenu/ICateItem'
import type ITodoList from '../interface/ITodoListArray'
import { onUnmounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import List from '../components/List/List.vue'
import saveItemSet from '../components/List/saveItemSet'
import TabBar from '../components/TabBar/TabBar.vue'
import emitter from '../util/bus'
import LocalStorage from '../util/localStorage'

function Other() {
  const { t } = useI18n()

  const title = ref('')

  const listData = ref<ITodoList[]>([])

  const route = useRoute()
  const router = useRouter()
  const list = ref<ITodoList[]>(LocalStorage('get')!)

  const showAddItem = ref(false)

  const todayShow = ref(localStorage.getItem('todayShow'))

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
      if (todayShow.value === 'todayRemind')
        listData.value = list.value!.filter(listData => new Date(listData.time!).toDateString() === new Date().toDateString())
      else if (todayShow.value === 'allAboutToday')
        listData.value = list.value!.filter(listData => new Date(listData.id).toDateString() === new Date().toDateString() || new Date(listData.time!).toDateString() === new Date().toDateString())
      else
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

  function delAllItem() {
    listData.value.length = 0
    const localList = LocalStorage('get')!

    let toRemove = localList.filter(item => item.ok)

    for (let i = toRemove.length - 1; i >= 0; i--) {
      localList.splice(localList.indexOf(toRemove[i]), 1)
    }

    saveItemSet(localList)
  }

  emitter.on('todayShow', (show) => {
    todayShow.value = show as string
  })

  onUnmounted(() => {
    emitter.off('todayShow')
  })

  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return vine`
    <TabBar
      left-img="i-ph:gear-fine-bold"
      :title="title"
      :left-img-show="simpleMode"
      :right-img-show="
        route.query.listName !== 'allNotDo'
        && route.query.listName !== 'allDo'
        && route.query.listName !== 'star'
      "
      :show-more="true"
      :show-wrap="true"
      @right-click="showAddItem = !showAddItem"
      @left-click="router.push('/setting-sim')"
      @delete-all-item="delAllItem"
    />
    <List :show-add-item="showAddItem" :list-data="listData" @set-add-item="showAddItem = false" />
  `
}

export default Other
