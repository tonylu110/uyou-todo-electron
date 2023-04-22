interface todoCateModel {
  uid: string
  data: string
}

export default (todoCate: todoCateModel) => {
  fetch('https://api.todo.uyou.org.cn/edittodocate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid: todoCate.uid,
      data: JSON.stringify(todoCate.data)
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log(res);
  })
}