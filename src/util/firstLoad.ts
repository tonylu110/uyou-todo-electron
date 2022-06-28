import i18n from "../i18n";
import LocalStorage from "./localStorage";

const firstLoad = () => {
  const firstToDo = {
    data: i18n().firstLoadData
  }
  if (localStorage.getItem('ToDo') === null) {
    LocalStorage('set', firstToDo)
  }
}

export default firstLoad;