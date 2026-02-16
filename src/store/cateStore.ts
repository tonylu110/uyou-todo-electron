import type { cateItem } from '../components/ListMenu/ICateItem'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTodoStore } from './todoStore'

export const useCateStore = defineStore('cate', () => {
  const cateList = ref<cateItem[]>(JSON.parse(localStorage.getItem('cate') || '{"data": []}').data)

  async function addCategory(category: Omit<cateItem, 'id'>) {
    const newCategory = {
      ...category,
      id: new Date().getTime(),
      color: category.color || 'primary-d',
    }
    cateList.value.push(newCategory)
    try {
      await saveAndSync()
    }
    catch (error) {
      saveToLocal()
      console.error('Failed to sync after adding category:', error)
    }
  }

  async function deleteCategory(id: number | string) {
    const index = cateList.value.findIndex(item => item.id === id)
    if (index !== -1) {
      cateList.value.splice(index, 1)
      try {
        await saveAndSync()
      }
      catch (error) {
        saveToLocal()
        console.error('Failed to sync after deleting category:', error)
      }
    }
  }

  async function deleteCategoryWithTodos(id: number | string) {
    const todoStore = useTodoStore()
    await todoStore.filterTodosByCate(id)
    await deleteCategory(id)
  }

  async function updateCategory(id: number | string, data: Partial<cateItem>) {
    const category = cateList.value.find(item => item.id === id)
    if (category) {
      Object.assign(category, data)
      try {
        await saveAndSync()
      }
      catch (error) {
        saveToLocal()
        console.error('Failed to sync after updating category:', error)
      }
    }
  }

  async function syncToServer() {
    const uid = localStorage.getItem('uid')
    if (!uid)
      return

    try {
      const response = await fetch('https://api.todo.uyou.org.cn/edittodocate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          data: JSON.stringify({
            data: cateList.value,
          }),
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to sync categories')
      }

      return result
    }
    catch (error) {
      console.error('Failed to sync categories:', error)
      throw error
    }
  }

  async function saveAndSync() {
    localStorage.setItem('cate', JSON.stringify({ data: cateList.value }))

    const uid = localStorage.getItem('uid')
    if (uid) {
      await syncToServer()
    }
  }

  function saveToLocal() {
    localStorage.setItem('cate', JSON.stringify({ data: cateList.value }))
  }

  async function syncFromServer(uid: string) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch('https://api.todo.uyou.org.cn/gettodocate', {
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
      cateList.value = JSON.parse(res.data).data

      saveToLocal()
      return true
    }
    catch (error) {
      console.error('Sync failed:', error)
      return false
    }
  }

  function getCateById(id: number | string) {
    if (id === 0)
      return { id: 0, title: '', color: '', icon: '' }
    else
      return cateList.value.find(item => item.id === id)
  }

  return {
    cateList,
    addCategory,
    deleteCategory,
    deleteCategoryWithTodos,
    updateCategory,
    saveToLocal,
    saveAndSync,
    syncFromServer,
    getCateById,
  }
})
