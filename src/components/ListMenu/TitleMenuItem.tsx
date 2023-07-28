import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import emitter from '../../util/bus'

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

  return () => (
    <>
      <div
        ml-10px p-10px no-drag cursor-pointer mb-10px
        bg={route.name === 'account' && route.query.from !== 'setting'
          ? 'primary-d dark:primary-a'
          : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'
        }
        rounded-7px flex items-center w="[calc(100%-40px)]"
        onClick={() => router.push('/account')}
      >
        <div
          rounded-full p-6px w-16px h-16px mr-10px
          bg={route.name === 'account' && route.query.from !== 'setting'
            ? 'white group-hover:white'
            : 'group-hover:white #333/20 dark:#bbb'
          }
        >
          <div
            i-ph:user-bold text-16px block
            c={route.name === 'account' && route.query.from !== 'setting'
              ? 'primary-d dark:primary-a'
              : 'group-hover:white #00000090 dark:#555'
            }
          />
        </div>
        <span
          font-bold
          c={route.name === 'account' && route.query.from !== 'setting'
            ? 'white group-hover:white'
            : 'group-hover:white #00000090 dark:#bbb'
          }
        >
          {loginText.value}
        </span>
      </div>
      <div flex="~ col" ml-10px no-drag>
        <div flex mb-10px>
          <div
            flex="~ col" rounded-7px p-10px cursor-pointer
            bg={route.query.listName === 'today'
              ? 'success-d dark:success-a'
              : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'
            }
            mr-10px w="[calc(50%-30px)]"
            onClick={() => toList('today')}
          >
            <div
              rounded-full p-6px w-16px h-16px mb-7px
              bg={route.query.listName === 'today'
                ? 'white group-hover:white'
                : 'group-hover:white #333/20 dark:#bbb'
              }
            >
              <div
                i-ph:sun-dim-bold text-16px block
                c={route.query.listName === 'today'
                  ? 'success-d dark:success-a'
                  : 'group-hover:white #00000090 dark:#555'
                }
              />
            </div>
            <span
              font-bold
              c={route.query.listName === 'today'
                ? 'white group-hover:white'
                : 'group-hover:white #00000090 dark:#bbb'
              }
            >
              {t('startPage.today')}
            </span>
          </div>
          <div
            flex="~ col" rounded-7px p-10px cursor-pointer
            bg={route.query.listName === 'star'
              ? 'warn-d dark:warn-a'
              : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'
            }
            w="[calc(50%-30px)]"
            onClick={() => toList('star')}
          >
            <div
              rounded-full p-6px w-16px h-16px mb-7px
              bg={route.query.listName === 'star'
                ? 'white group-hover:white'
                : 'group-hover:white #333/20 dark:#bbb'
              }
            >
              <div
                i-ph:star-bold text-16px block
                c={route.query.listName === 'star'
                  ? 'warn-d dark:warn-a'
                  : 'group-hover:white #00000090 dark:#555'
                }
              />
            </div>
            <span
              font-bold
              c={route.query.listName === 'star'
                ? 'white group-hover:white'
                : 'group-hover:white #00000090 dark:#bbb'
              }
            >
              {t('listMenu.star')}
            </span>
          </div>
        </div>
        <div flex mb-10px>
          <div
            flex="~ col" rounded-7px p-10px cursor-pointer
            bg={route.query.listName === 'allNotDo'
              ? 'primary-d dark:primary-a'
              : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'
            }
            mr-10px w="[calc(50%-30px)]"
            onClick={() => toList('allNotDo')}
          >
            <div
              rounded-full p-6px w-16px h-16px mb-7px
              bg={route.query.listName === 'allNotDo'
                ? 'white group-hover:white'
                : 'group-hover:white #333/20 dark:#bbb'
              }
            >
              <div
                i-ph:circle-bold text-16px block
                c={route.query.listName === 'allNotDo'
                  ? 'primary-d dark:primary-a'
                  : 'group-hover:white #00000090 dark:#555'
                }
              />
            </div>
            <span
              font-bold
              c={route.query.listName === 'allNotDo'
                ? 'white group-hover:white'
                : 'group-hover:white #00000090 dark:#bbb'
              }
            >
              {t('listMenu.incompleted')}
            </span>
          </div>
          <div
            flex="~ col" rounded-7px p-10px cursor-pointer
            bg={route.query.listName === 'allDo'
              ? 'primary-d dark:primary-a'
              : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'
            }
            w="[calc(50%-30px)]"
            onClick={() => toList('allDo')}
          >
            <div
              rounded-full p-6px w-16px h-16px mb-7px
              bg={route.query.listName === 'allDo'
                ? 'white group-hover:white'
                : 'group-hover:white #333/20 dark:#bbb'
              }
            >
              <div
                i-ph:check-circle-bold text-16px block
                c={route.query.listName === 'allDo'
                  ? 'primary-d dark:primary-a'
                  : 'group-hover:white #00000090 dark:#555'
                }
              />
            </div>
            <span
              font-bold
              c={route.query.listName === 'allDo'
                ? 'white group-hover:white'
                : 'group-hover:white #00000090 dark:#bbb'
              }
            >
              {t('listMenu.completed')}
            </span>
          </div>
        </div>
        <div
          flex="~ col" rounded-7px p-10px cursor-pointer mb-5px
          bg={route.name === 'Home'
            ? 'primary-d dark:primary-a'
            : '#333/10 hover:#333/20 active:#333/30 dark:#999/20 dark:hover:#999/30 dark:active:#999/40'
          }
          w="[calc(100%-30px)]"
          onClick={() => router.push('/')}
        >
          <div
            rounded-full p-6px w-16px h-16px mb-7px
            bg={route.name === 'Home'
              ? 'white group-hover:white'
              : 'group-hover:white #333/20 dark:#bbb'
            }
          >
            <div
              i-ph:list-dashes-bold text-16px block
              c={route.name === 'Home'
                ? 'primary-d dark:primary-a'
                : 'group-hover:white #00000090 dark:#555'
              }
            />
          </div>
          <span
            font-bold
            c={route.name === 'Home'
              ? 'white group-hover:white'
              : 'group-hover:white #00000090 dark:#bbb'
            }
          >
            {t('listMenu.allTodo')}
          </span>
        </div>
      </div>
    </>
  )
}

export default TitleMenuItem
