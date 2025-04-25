<template>
    <div class="item-details">
        <input v-model="item.title" />
        <h2>Estado: {{ item.checked ? 'Terminada' : 'Por terminar' }}</h2>
        <button @click="item.checked = !item.checked">
            {{ item.checked ? 'Marcar como no terminada' : 'Marcar como terminada' }}
        </button>
        <button @click="updateItem(item); $router.replace({ path: '/' })">Actualizar tarea</button>
        <button @click="deleteItem(item.id); $router.replace({ path: '/' })">Eliminar tarea</button>
        <routerLink to="/">Close</routerLink>
    </div>
</template>

<script lang="ts" setup>
import { useTodoList } from '@/composables/useTodoList';
import type { Item } from '@/interfaces/item';
import { onMounted, ref, watch } from 'vue';


const props = defineProps<{
    id: string
}>()

const item = ref<Item>({
    id: '',
    title: '',
    checked: false
})
onMounted(async () => {
    item.value = await lookTask(props.id)
})

watch(() => props.id, async (newId) => {
    item.value = await lookTask(newId)
})

const { lookTask, updateItem, deleteItem } = useTodoList()

</script>

<style scoped lang="css">
.item-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

h2 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
    color: #333;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
</style>