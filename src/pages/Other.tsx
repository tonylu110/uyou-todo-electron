import { Ref, defineComponent, ref, watchEffect } from "vue";
import TabBar from '../components/TabBar/TabBar.vue';
import List from '../components/List/List.vue';
import { useRoute, useRouter } from 'vue-router';
import LocalStorage from '../util/localStorage';
import ITodoList from '../interface/ITodoListArray';
import i18n from '../i18n';
import { cateItem } from "../components/ListMenu/ICateItem";

export default defineComponent({
  setup() {
    const title = ref('')

    const listData: Ref<ITodoList[]> = ref([])

    const route = useRoute()
    const router = useRouter()
    const list = ref(LocalStorage('get'))

    const showAddItem = ref(false)

    watchEffect(() => {
      if (route.query.listName === 'allNotDo') {
        listData.value = list.value!.filter(listData => listData.ok === false)
        title.value = i18n().listMenu.incompleted
      } else if (route.query.listName === 'allDo') {
        listData.value = list.value!.filter(listData => listData.ok === true)
        title.value = i18n().listMenu.completed
      } else {
        listData.value = list.value!.filter(listData => listData.cate === route.query.listName)
        const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
        title.value = JSON.parse(localCateList!).data.filter((cate: cateItem) => cate.id + '' === route.query.listName )[0].title
      }
    })

    const simpleMode = localStorage.getItem('simpleMode') === 'true'

    return () => (
      <>
        <TabBar
          leftImg="i-mdi:cog"
          title={title.value}
          leftImgShow={simpleMode}
          rightImgShow={route.query.listName !== 'allNotDo' && route.query.listName !== 'allDo'}
          onRightClick={() => showAddItem.value = !showAddItem.value}
          onLeftClick={() => router.push('/setting-sim')}
          showMore={simpleMode}
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
})