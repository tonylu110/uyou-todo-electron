import type ITodoList from '../interface/ITodoListArray'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import emitter from '../util/bus'

interface TodoState {
  data: ITodoList[]
}

export const useTodoStore = defineStore('todo', () => {
  const todoList = ref<TodoState>(JSON.parse(localStorage.getItem('ToDo') || '{"data": []}'))
  const isLoading = ref(false)

  async function addTodo(todo: ITodoList) {
    todoList.value.data.push(todo)
    try {
      await saveAndSync()
    }
    catch (error) {
      saveToLocal()
      console.error('Failed to sync after adding todo:', error)
    }
  }

  async function deleteTodo(id: number) {
    const index = todoList.value.data.findIndex(item => item.id === id)
    if (index !== -1) {
      todoList.value.data.splice(index, 1)
      try {
        await saveAndSync()
      }
      catch (error) {
        saveToLocal()
        console.error('Failed to sync after deleting todo:', error)
      }
    }
  }

  async function updateTodo(id: number, data: Partial<ITodoList>) {
    const todo = todoList.value.data.find(item => item.id === id)
    if (todo) {
      Object.assign(todo, data)
      try {
        await saveAndSync()
      }
      catch (error) {
        saveToLocal()
        console.error('Failed to sync after updating todo:', error)
      }
    }
  }

  async function filterTodosByCate(cateId: number | string) {
    todoList.value.data = todoList.value.data.filter(todo => todo.cate !== `${cateId}`)
    try {
      await saveAndSync()
    }
    catch (error) {
      saveToLocal()
      console.error('Failed to sync after filtering todos:', error)
    }
  }

  async function syncFromServer(uid: string) {
    try {
      isLoading.value = true
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch('https://api.todo.uyou.org.cn/gettodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const res = await response.json()
      todoList.value = JSON.parse(res.data) as TodoState

      saveToLocal()
      return true
    }
    catch (error) {
      console.error('Sync failed:', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  async function saveAndSync() {
    localStorage.setItem('ToDo', JSON.stringify(todoList.value))

    const uid = localStorage.getItem('uid')
    if (uid !== null && uid !== '') {
      try {
        const response = await fetch('https://api.todo.uyou.org.cn/edittodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid,
            data: JSON.stringify(todoList.value),
          }),
        })

        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.message || 'Failed to sync')
        }
      }
      catch (error) {
        console.error('Sync failed:', error)
        throw error
      }
    }
  }

  function saveToLocal() {
    localStorage.setItem('ToDo', JSON.stringify(todoList.value))
    emitter.emit('changeList')
  }

  const otherTodos = computed<ITodoList[]>(() =>
    todoList.value.data.filter(todo => todo.cate === undefined),
  )

  return {
    todoList,
    isLoading,
    otherTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    filterTodosByCate,
    syncFromServer,
    saveToLocal,
    saveAndSync,
  }
})
