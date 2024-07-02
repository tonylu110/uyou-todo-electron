import { useI18n } from 'vue-i18n'
import type IToDoListData from '../interface/IToDoListData'
import LocalStorage from './localStorage'

function firstLoad() {
  const { t } = useI18n()

  const firstToDo: IToDoListData = {
    data: [
      {
        text: t('firstLoadData[0]'),
        id: new Date().getTime(),
        ok: false,
        cate: '123',
      },
      {
        text: t('firstLoadData[1]'),
        id: new Date().getTime() + 1,
        ok: true,
        cate: '123',
      },
      {
        text: t('firstLoadData[2]'),
        id: new Date().getTime() + 3,
        ok: false,
        cate: '123',
      },
      {
        text: t('firstLoadData[3]'),
        id: new Date().getTime() + 4,
        ok: false,
        cate: '123',
      },
      {
        text: t('firstLoadData[4]'),
        id: new Date().getTime() + 5,
        ok: false,
        cate: '456',
        star: true,
      },
      {
        text: t('firstLoadData[5]'),
        id: new Date().getTime() + 6,
        ok: false,
        cate: '456',
      },
    ],
  }

  const cateData = {
    data: [
      {
        id: 123,
        title: t('newCate'),
      },
      {
        id: 456,
        title: t('seccate'),
      },
    ],
  }
  if (localStorage.getItem('ToDo') === null) {
    LocalStorage('set', firstToDo)
    localStorage.setItem('cate', JSON.stringify(cateData))
  }
}

export default firstLoad
