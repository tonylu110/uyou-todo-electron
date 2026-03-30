import type { cateItem } from './ICateItem'
import { api } from '../../util/api'
import { createToast } from '../Toast'

interface todoCateModel {
  uid: string
  data: {
    data: cateItem[]
  }
}

export default (todoCate: todoCateModel) => {
  api('/edittodocate', {
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
