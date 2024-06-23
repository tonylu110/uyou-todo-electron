import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import emitter from '../../../util/bus'
import LocalStorage from '../../../util/localStorage'
import type ListItems from '../../../pages/Laboratory/showListItem/ListItems'

const TitleMenuItem: SetupFC = () => {
  const { t } = useI18n()

  const route = useRoute()
  const router = useRouter()

  const loginText = ref(localStorage.getItem('uid') ? localStorage.getItem('uname') : t('loginText'))
  emitter.on('setLoginText', (uname) => {
    loginText.value = uname as string
  })

  const toList = (listName: string) => {
    router.push({
      path: '/other',
      query: {
        listName,
      },
    })
  }

  const listData = ref(LocalStorage('get'))

  const todayShow = ref(localStorage.getItem('todayShow'))
  emitter.on('todayShow', (show) => {
    todayShow.value = show as string
  })

  const TodayNum = computed(() => {
    if (todayShow.value === 'todayRemind')
      return listData.value!.filter(listData => new Date(listData.time!).toDateString() === new Date().toDateString()).length
    else if (todayShow.value === 'allAboutToday')
      return listData.value!.filter(listData => new Date(listData.id).toDateString() === new Date().toDateString() || new Date(listData.time!).toDateString() === new Date().toDateString()).length
    else
      return listData.value!.filter(listData => new Date(listData.id).toDateString() === new Date().toDateString()).length
  })
  const starNum = computed(() => listData.value!.filter(listData => listData.star === true).length)
  const doNum = computed(() => listData.value!.filter(listData => listData.ok).length)
  const notDoNum = computed(() => listData.value!.filter(listData => !listData.ok).length)

  emitter.on('changeList', () => {
    listData.value = LocalStorage('get')
  })

  const showList = ref<ListItems>(localStorage.getItem('listMenuItem')
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

  emitter.on('setListItem', (data) => {
    showList.value = (data as ListItems)
  })

  const listAllHidden = computed(() => Object.keys(showList.value).map(key => showList.value[key as keyof ListItems].show).every(t => !t))

  const isVip = ref(localStorage.getItem('isVip') === 'true')

  emitter.on('changeVip', (data) => {
    isVip.value = data as boolean
  })

  return () => (
    <>
      <div
        ml-10px
        p-10px
        no-drag
        cursor-pointer
        mb-10px
        relative
        bg={route.name === 'account' && route.query.from !== 'setting'
          ? 'primary-d dark:primary-a'
          : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'}
        rounded-7px
        flex
        items-center
        justify-between
        w="[calc(100%-40px)]"
        onClick={() => router.push('/account')}
      >
        <div flex items-center>
          <div
            rounded-full
            p-6px
            w-16px
            h-16px
            mr-10px
            bg={route.name === 'account' && route.query.from !== 'setting'
              ? 'white group-hover:white'
              : '#333/20 dark:#bbb'}
          >
            <div
              i-ph:user-bold
              text-16px
              block
              c={route.name === 'account' && route.query.from !== 'setting'
                ? 'primary-d dark:primary-a'
                : '#00000090 dark:#555'}
            />
          </div>
          <span
            font-bold
            c={route.name === 'account' && route.query.from !== 'setting'
              ? 'white group-hover:white'
              : 'group-hover:white #00000090 dark:#bbb'}
          >
            {loginText.value}
          </span>
        </div>
        {isVip.value ? <img src="./images/VIP.png" w-27px h-27px alt="" srcset="" /> : null}
      </div>
      <div flex="~ col" ml-10px no-drag>
        <div flex="~ wrap gap-10px" mb={listAllHidden.value ? '' : '10px'}>
          {showList.value.today.show
            ? (
              <div
                flex="~ col"
                rounded-7px
                p-10px
                cursor-pointer
                relative
                bg={route.query.listName === 'today'
                  ? 'success-d dark:success-a'
                  : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'}
                w="[calc(50%-30px)]"
                onClick={() => toList('today')}
              >
                <div
                  rounded-full
                  p-6px
                  w-16px
                  h-16px
                  mb-7px
                  bg={route.query.listName === 'today'
                    ? 'white group-hover:white'
                    : 'success-d dark:success-a'}
                >
                  <div
                    i-ph:sun-dim-bold
                    text-16px
                    block
                    c={route.query.listName === 'today'
                      ? 'success-d dark:success-a'
                      : 'white'}
                  />
                </div>
                <span
                  font-bold
                  c={route.query.listName === 'today'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {t('startPage.today')}
                </span>
                <span
                  absolute
                  right-13px
                  font-bold
                  c={route.query.listName === 'today'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {TodayNum.value}
                </span>
              </div>
              )
            : null}
          {showList.value.star.show
            ? (
              <div
                flex="~ col"
                rounded-7px
                p-10px
                cursor-pointer
                relative
                bg={route.query.listName === 'star'
                  ? 'warn-a warn-d dark:warn-a'
                  : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'}
                w="[calc(50%-30px)]"
                onClick={() => toList('star')}
              >
                <div
                  rounded-full
                  p-6px
                  w-16px
                  h-16px
                  mb-7px
                  bg={route.query.listName === 'star'
                    ? 'white group-hover:white'
                    : 'warn-d dark:warn-a'}
                >
                  <div
                    i-ph:star-bold
                    text-16px
                    block
                    c={route.query.listName === 'star'
                      ? 'warn-d dark:warn-a'
                      : 'white'}
                  />
                </div>
                <span
                  font-bold
                  c={route.query.listName === 'star'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {t('listMenu.star')}
                </span>
                <span
                  absolute
                  right-13px
                  font-bold
                  c={route.query.listName === 'star'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {starNum.value}
                </span>
              </div>
              )
            : null}
          {showList.value.allNotDo.show
            ? (
              <div
                flex="~ col"
                rounded-7px
                p-10px
                cursor-pointer
                relative
                bg={route.query.listName === 'allNotDo'
                  ? 'error-d dark:error-h'
                  : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'}
                w="[calc(50%-30px)]"
                onClick={() => toList('allNotDo')}
              >
                <div
                  rounded-full
                  p-6px
                  w-16px
                  h-16px
                  mb-7px
                  bg={route.query.listName === 'allNotDo'
                    ? 'white group-hover:white'
                    : 'error-d dark:error-h'}
                >
                  <div
                    i-ph:circle-bold
                    text-16px
                    block
                    c={route.query.listName === 'allNotDo'
                      ? 'error-d dark:error-h'
                      : 'white'}
                  />
                </div>
                <span
                  font-bold
                  c={route.query.listName === 'allNotDo'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {t('listMenu.incompleted')}
                </span>
                <span
                  absolute
                  right-13px
                  font-bold
                  c={route.query.listName === 'allNotDo'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {notDoNum.value}
                </span>
              </div>
              )
            : null}
          {showList.value.allDo.show
            ? (
              <div
                flex="~ col"
                rounded-7px
                p-10px
                cursor-pointer
                relative
                bg={route.query.listName === 'allDo'
                  ? 'gray-400 dark:gray-600'
                  : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'}
                w="[calc(50%-30px)]"
                onClick={() => toList('allDo')}
              >
                <div
                  rounded-full
                  p-6px
                  w-16px
                  h-16px
                  mb-7px
                  bg={route.query.listName === 'allDo'
                    ? 'white group-hover:white'
                    : 'gray-400 dark:gray-600'}
                >
                  <div
                    i-ph:check-circle-bold
                    text-16px
                    block
                    c={route.query.listName === 'allDo'
                      ? 'gray-400 dark:gray-600'
                      : 'white'}
                  />
                </div>
                <span
                  font-bold
                  c={route.query.listName === 'allDo'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {t('listMenu.completed')}
                </span>
                <span
                  absolute
                  right-13px
                  font-bold
                  c={route.query.listName === 'allDo'
                    ? 'white group-hover:white'
                    : 'group-hover:white #00000090 dark:#bbb'}
                >
                  {doNum.value}
                </span>
              </div>
              )
            : null}
        </div>
        <div
          flex="~ col"
          rounded-7px
          p-10px
          cursor-pointer
          mb-5px
          bg={route.name === 'Home'
            ? 'primary-d dark:primary-a'
            : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'}
          w="[calc(100%-30px)]"
          onClick={() => router.push('/')}
        >
          <div
            rounded-full
            p-6px
            w-16px
            h-16px
            mb-7px
            bg={route.name === 'Home'
              ? 'white group-hover:white'
              : 'primary-d dark:primary-a'}
          >
            <div
              i-ph:list-dashes-bold
              text-16px
              block
              c={route.name === 'Home'
                ? 'primary-d dark:primary-a'
                : 'white'}
            />
          </div>
          <span
            font-bold
            c={route.name === 'Home'
              ? 'white group-hover:white'
              : 'group-hover:white #00000090 dark:#bbb'}
          >
            {t('listMenu.allTodo')}
          </span>
        </div>
      </div>
    </>
  )
}

export default TitleMenuItem
