import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/textbooks-system',
      name: 'about',
      component: () => import('../views/TextBooksSystemView.vue'),
      children: [
        {
          path: '',
          name: 'textbooks-system-index',
          component: () => import('../components/xbxx/XbxxTable.vue'),
        },
        {
          path: 'bmxx',
          name: 'bmxx',
          component: () => import('../components/xbxx/XbxxTable.vue'),
        },
        {
          path: 'jcyg',
          name: 'jcyg',
          component: () => import('../components/JcygTable.vue'),
        },
      ],
    },
  ],
})

export default router
