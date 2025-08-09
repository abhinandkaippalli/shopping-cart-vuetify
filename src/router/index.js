import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
const DashBoard = defineAsyncComponent(() => import('@/views/home'))
import Products from '@/components/products'
const Cart = defineAsyncComponent(() => import('@/components/cart'))
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashBoard,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
  ]
})
export default router
