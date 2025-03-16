import { createRouter, createWebHistory } from 'vue-router'
import CienciaIntro from '@/views/intro.vue'
import BlogView from '@/views/blog.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CienciaIntro
  },
  {
    path: '/blog', // Esta será la URL de tu vista de blog
    name: 'blog', // Este es el nombre de la ruta, que puedes usar en <router-link> y otros lugares
    component: BlogView // Este es el componente que se mostrará cuando se navegue a esta ruta
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
