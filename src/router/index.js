import { createRouter, createWebHistory } from 'vue-router'
import MaandView from '../views/MaandView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'maand',
      component: MaandView
    },
    {
      path: '/Startlocaties',
      name: 'startlocaties',

      component: () => import('../views/Startlocaties.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
