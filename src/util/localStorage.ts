import ITodoList from "../interface/ITodoListArray";
import IToDoListData from "../interface/IToDoListData";

const LocalStorage = (sog: string, key?: IToDoListData): void | ITodoList[] => {
  if (sog.toLowerCase() === 'set') {
    localStorage.setItem('ToDo', JSON.stringify(key));
  } else {
    return JSON.parse(localStorage.getItem('ToDo')!).data;
  }
}

export default LocalStorage