const todo = localStorage.getItem('ToDo')
const cate = localStorage.getItem('cate')

export const system = `This is my todo list: ${todo}, This is my todo category: ${cate}. In todo, the id attribute is the timestamp of creation time, the text attribute is the todo content, isOk is whether it is completed, cate is the category id of the category to which the todo belongs, star is whether it is starred, and time is the timestamp of the reminder time. In category, id is the category id, title is the category name, icon is the category icon, and color is the category color. You need to answer me about it`
