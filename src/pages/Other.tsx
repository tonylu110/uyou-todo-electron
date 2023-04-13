import { Ref, defineComponent, ref, watchEffect } from "vue";
import TabBar from '../components/TabBar/TabBar.vue';
import List from '../components/List/List.vue';
import router from '../router';
import { useRoute } from 'vue-router';
import LocalStorage from '../util/localStorage';
import ITodoList from '../interface/ITodoListArray';
import i18n from '../i18n';

export default defineComponent({
  setup() {
    const title = ref('')

    const listData: Ref<ITodoList[]> = ref([])

    const route = useRoute()
    const list = ref(LocalStorage('get'))

    watchEffect(() => {
      if (route.query.listName === 'allNotDo') {
        listData.value = list.value!.filter(listData => listData.ok === false)
        title.value = i18n().listMenu.incompleted
      } else if (route.query.listName === 'allDo') {
        listData.value = list.value!.filter(listData => listData.ok === true)
        title.value = i18n().listMenu.completed
      }
    })

    return () => (
      <>
        <TabBar
          onLeftClick={() => router.push('/setting')}
          title={title.value}
          leftImgShow={false}
          rightImgShow={false}
        />
        <List listData={listData.value} />
      </>
    )
  }
})