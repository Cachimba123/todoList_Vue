
<template>
    <div class="item-details">
        <h2>{{ item.title }}</h2>
        <h2>Estado: {{item.checked?'Terminada':'Por terminar'}}</h2>
        <button @click="$emit('updateItem', item)">
            {{ item.checked ? 'Marcar como no terminada' : 'Marcar como terminada' }}
        </button>
        <button @click="$emit('deleteItem', item.id)">Eliminar tarea</button>
        <routerLink to="/">Close</routerLink>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    item: {
        id: number
        title: string
        checked: boolean
    }
}>()

</script>

<style scoped lang="scss">


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