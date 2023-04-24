import { cateItem } from "../components/ListMenu/ICateItem"
import emitter from "./bus"

export default () => {
  const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
  const cateList: cateItem[] = JSON.parse(localCateList!).data

  const autoSync = localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null
  const uid = localStorage.getItem('uid')
  if ((uid !== '' && uid !== null) && autoSync) {
    fetch('https://api.todo.uyou.org.cn/gettodocate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res._id) {
        cateList.length = 0
        JSON.parse(res.data).data.forEach((item: cateItem) => {
          cateList.push(item)
        });
        localStorage.setItem('cate', JSON.stringify({ data: cateList }))
        emitter.emit('setCate', res.data)
      } else {
        fetch('https://api.todo.uyou.org.cn/addtodocate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: uid,
            data: localCateList
          })
        }).then(res => {
          return res.json()
        }).then(res => {
          console.log(res);
        })
      }
    })
  } else {
    emitter.emit('setCate', localCateList)
  }
}