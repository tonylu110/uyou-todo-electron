import ITodoList from "../../interface/ITodoListArray"
import IToDoListData from "../../interface/IToDoListData"
import LocalStorage from "../../util/localStorage"

const saveItemSet = (list: ITodoList[]) => {
  const localStorageSetTodoList: IToDoListData = {
    data: list
  }
  LocalStorage('set', localStorageSetTodoList)
}

export default saveItemSet