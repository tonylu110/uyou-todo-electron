import type ITodoList from '../interface/ITodoListArray'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import List from '../components/List/List.vue'
import TabBar from '../components/TabBar/TabBar.vue'
import LocalStorage from '../util/localStorage'

function Home() {
  const router = useRouter()

  const { t } = useI18n()

  const showAddItem = ref(false)

  const listData = LocalStorage('get') as ITodoList[]
  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return vine`
    <TabBar
      left-img="i-ph:gear-fine-bold"
      :title="t('listMenu.allTodo')"
      :left-img-show="simpleMode"
      :show-more="true"
      :show-wrap="true"
      @right-click="showAddItem = !showAddItem"
      @left-click="router.push('/setting-sim')"
    />
    <List
      :show-add-item="showAddItem"
      :list-data="listData"
      @set-add-item="showAddItem = false"
    />
  `
}

export default Home
