import ITodoList from "../../interface/ITodoListArray"
import IToDoListData from "../../interface/IToDoListData"
import LocalStorage from "../../util/localStorage"

const saveItemSet = (list: ITodoList[]) => {
  const localStorageSetTodoList: IToDoListData = {
    data: list
  }
  LocalStorage('set', localStorageSetTodoList)
  const uid = localStorage.getItem('uid')
  if (uid !== null && uid !== '') {
    fetch('https://api.todo.uyou.org.cn/edittodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid,
        data: JSON.stringify(localStorageSetTodoList)
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      console.log(res);
    })
  }
}

export default saveItemSet