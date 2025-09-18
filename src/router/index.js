import { createRouter, createWebHashHistory } from 'vue-router'
import MainComponent from '@/components/MainComponent.vue'
import Products from '@/views/Products.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: MainComponent,
    children: [
      {
        path: '/',
        name: 'Products',
        component: Products,
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
