import type { Item } from '@/interfaces/item'
import { ref } from 'vue'

export const useTodoList = () => {
  const itemTitle = ref('')
  const listItems = ref<Item[]>([])

  const findItemInList = (item: Item): Item | undefined => {
    return listItems.value.find((itemInList: Item) => itemInList.id === item.id)
  }
  const toggleItemChecked = (item: Item): void => {
    item.checked = !item.checked
  }

  const getTodoList = async () => {
    try {
      const res = await fetch('http://localhost:3000/listTitles')
      listItems.value = await res.json()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const updateItem = async (item: Item) => {
    try {
      /*       const updatedItem = findItemInList(item)
      if (updatedItem) { */
      await fetch(`http://localhost:3000/listTitles/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
    } catch (error) {
      console.error('Error al encontrar o modificar el item:', error)
    }
  }

  const lookTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/listTitles/${id}`)
      return await res.json()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const deleteItem = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/listTitles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      listItems.value = listItems.value.filter((i) => i.id !== id)
    } catch (error) {
      console.error('Error al eliminar el item:', error)
    }
  }
  const addItem = async (Item: Item) => {
    try {
      await fetch('http://localhost:3000/listTitles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Item),
      })
      listItems.value.push(Item)
    } catch (error) {
      console.error('Error al agregar el item:', error)
    } finally {
      itemTitle.value = ''
    }
  }
  const deleteAllFinished = async () => {
    try {
      /* const finishedItems = listItems.value.filter(item => item.checked)
      for (const item of finishedItems) {
        await deleteItem(item)
      } */

      for (const item of listItems.value) {
        if (item.checked) {
          await deleteItem(item.id)
        }
      }
    } catch (error) {
      console.error('Error al eliminar las tareas terminadas:', error)
    }
  }

  const generateId = () => crypto.randomUUID()

  return {
    getTodoList,
    listItems,
    addItem,
    deleteItem,
    updateItem,
    lookTask,
    deleteAllFinished,
    generateId,
    findItemInList,
    toggleItemChecked,
    itemTitle,
  }
}
