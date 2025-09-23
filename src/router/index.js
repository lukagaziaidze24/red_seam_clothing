import { createRouter, createWebHashHistory } from 'vue-router'
import MainComponent from '@/components/MainComponent.vue'
import Products from '@/views/Products.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import DetailedProduct from '@/views/DetailedProduct.vue'
import Checkout from '@/views/Checkout.vue'

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
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      },
      {
        path: '/detailedProduct/:productID',
        name: 'detailedProduct',
        component: DetailedProduct,
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
      },
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
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHashHistory(),
  routes
})

export default router
