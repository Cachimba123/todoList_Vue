<script lang='ts' setup>

import ListItem from './ListItem.vue'
import { ref, onMounted, computed, type Ref } from 'vue'
type Item = {
  title: string,
  checked?: boolean
}

const storageItems: Ref<Item[]> = ref([])

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

onMounted(() => {
  initListItems()
  storageItems.value = getFromStorage()
})

const initListItems = (): void => {
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


</script>

<template>
  <ul>
    <li :key='key' v-for='(item, key) in sortedList'>
      <ListItem :is-checked='item.checked' v-on:click.prevent="updateItem(item)">{{ item.title }}</ListItem>
    </li>
  </ul>
</template>