import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/components/TodoList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeList',
      component: TodoList,
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import('@/components/itemDetails.vue'),
      props: true,
    },
  ],
})

export default router
