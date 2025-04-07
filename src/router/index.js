import { createRouter, createWebHistory } from 'vue-router'
import CienciaIntro from '@/views/intro.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CienciaIntro
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
