import { useI18n } from 'vue-i18n'
import LocalStorage from './localStorage'

function firstLoad() {
  const { t } = useI18n()

  const firstToDo = {
    data: [
      {
        text: t('firstLoadData[0]'),
        id: new Date().getTime(),
        ok: false,
      },
      {
        text: t('firstLoadData[1]'),
        id: new Date().getTime() + 1,
        ok: false,
      },
      {
        text: t('firstLoadData[2]'),
        id: new Date().getTime() + 3,
        ok: false,
      },
      {
        text: t('firstLoadData[3]'),
        id: new Date().getTime() + 4,
        ok: false,
      },
    ],
  }
  if (localStorage.getItem('ToDo') === null)
    LocalStorage('set', firstToDo)
}

export default firstLoad
