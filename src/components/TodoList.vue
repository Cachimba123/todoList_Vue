<script lang='ts' setup>

import type { Item } from '@/interfaces/item'
import ListItem from './ListItem.vue'
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTodoList } from '@/composables/useTodoList'

/* type Item = {
  title: string,
  checked?: boolean
} */





// const storageItems: Ref<Item[]> = ref([])

/* const listItems: Ref<Item[]> = ref([
  { title: 'Make a todo list app', checked: true },
  { title: 'Predict the weather', checked: false },
  { title: 'Play some tunes', checked: false },
  { title: 'Let\'s get cooking', checked: false },
  { title: 'Pump some iron', checked: false },
  { title: 'Track my expenses', checked: false },
  { title: 'Organise a game night', checked: false },
  { title: 'Learn a new language', checked: false },
  { title: 'Publish my work' }
 ])

 const updateItem = (item: Item): void => {
    const updatedItem = findItemInList(item)
    if (updatedItem) {
      toggleItemChecked(updatedItem)
    }
 }


 const findItemInList = (item: Item): Item | undefined => {
      return listItems.value.find(
      (itemInList: Item) => itemInList.title === item.title
      )
 } */
// const sortedList = computed(() => [...listItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)))

/* 
onMounted(() => {
  initListItems()
  storageItems.value = getFromStorage()
}) */

/* const initListItems = (): void => {
  if (storageItems.value?.length === 0) {
    const listItems = [
      { title: 'Make a todo list app', checked: true },
      { title: 'Predict the weather', checked: false },
      { title: 'Read some comics', checked: false },
      { title: 'Let\'s get cooking', checked: false },
      { title: 'Pump some iron', checked: false },
      { title: 'Track my expenses', checked: false },
      { title: 'Organise a game night', checked: false },
      { title: 'Learn a new language', checked: false },
      { title: 'Publish my work' }
    ]
    setToStorage(listItems)
    storageItems.value = listItems
  }
}



const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}

const updateItem = (item: Item): void => {
  const updatedItem = findItemInList(item)
  if (updatedItem) {
    toggleItemChecked(updatedItem)
    setToStorage(storageItems.value)
  }
}
const findItemInList = (item: Item): Item | undefined => {
  return storageItems.value.find(
    (itemInList: Item) => itemInList.title === item.title
  )
}
const sortedList = computed(() =>
  [...storageItems.value].sort((a, b) => (a.checked ? 1 : 0) -
    (b.checked ? 1 : 0))
)
// const sortedList = computed(() => [...listItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)))

const setToStorage = (items: Item[]): void => {
  localStorage.setItem('list-items', JSON.stringify(items))
}
const getFromStorage = (): Item[] | [] => {
  const stored = localStorage.getItem('list-items')
  if (stored) {
    return JSON.parse(stored)
  }
  return []

}
 */
const { listItems,
  addItem,
  deleteItem,
  updateItem,
  deleteAllFinished,
  generateId,
  itemTitle,
  getTodoList
} = useTodoList()

const listItemsFind = computed(() => {
  if (itemTitle.value) {
    return listItems.value.filter((item: Item) => item.title.toLowerCase().includes(itemTitle.value.toLowerCase()))
  } else {
    return []
  }
})
const sortedList = computed(() => [...listItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)))

onMounted(async () => {
  await getTodoList()
})




</script>

<template>
  <div>
    <label>Buscar Tarea</label>
    <input type="text" v-model="itemTitle" placeholder="Buscar tarea" />
    <button @click="deleteAllFinished">Eliminar tareas terminadas</button>
    <button @click="addItem({ title: itemTitle, checked: false, id: generateId() })">Agregar tarea</button>
    <div v-if="listItemsFind.length > 0">
      <ul>
        <li :key='key' v-for="item, key in listItemsFind">
          <ListItem :is-checked='item.checked' @click.prevent="updateItem(item)">{{ item.title }}</ListItem>
          <RouterLink :to="{ name: 'item', params: { id: item.id } }">Ver tarea</RouterLink>
          <button @click="deleteItem(item.id)">Eliminar tarea</button>
        </li>
      </ul>
    </div>
  </div>

  <div v-if="listItems.length == 0">
    <h2>Todo List</h2>
  </div>
  <ul v-else>
    <li :key='key' v-for='(item, key) in sortedList'>
      <ListItem :is-checked='item.checked' @click.prevent="item.checked = !item.checked; updateItem(item)">{{ item.title
        }}</ListItem>
      <RouterLink :to="{ name: 'item', params: { id: item.id } }">Ver tarea</RouterLink>
      <button @click="deleteItem(item.id)">Eliminar tarea</button>
    </li>
  </ul>
</template>