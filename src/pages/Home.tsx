import { ref } from 'vue'
import TabBar from '../components/TabBar/TabBar.vue'
import List from '../components/List/List.vue'
import router from '../router'
import firstLoad from '../util/firstLoad'
import LocalStorage from '../util/localStorage'
import type ITodoList from '../interface/ITodoListArray'
import i18n from '../i18n'

const Home: SetupFC = () => {
  const showAddItem = ref(false)

  firstLoad()

  const listData = LocalStorage('get') as ITodoList[]
  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return () => (
    <>
      <TabBar
        onRightClick={() => showAddItem.value = !showAddItem.value}
        onLeftClick={() => router.push('/setting-sim')}
        leftImg="i-mdi:cog"
        title={i18n().listMenu.allTodo}
        leftImgShow={simpleMode}
        showMore={simpleMode}
        showWrap={true}
      />
      <List
        showAddItem={showAddItem.value}
        listData={listData}
        onSetAddItem={() => showAddItem.value = false}
      />
    </>
  )
}

export default Home
