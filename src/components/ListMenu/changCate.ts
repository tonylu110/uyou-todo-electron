import { createToast } from '../Toast'
import type { cateItem } from './ICateItem'

interface todoCateModel {
  uid: string
  data: {
    data: cateItem[]
  }
}

export default (todoCate: todoCateModel) => {
  fetch('https://api.todo.uyou.org.cn/edittodocate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: todoCate.uid,
      data: JSON.stringify(todoCate.data),
    }),
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    createToast({ msg: err })
  })
}
