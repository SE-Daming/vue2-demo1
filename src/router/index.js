import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/engineer',
    name: 'engineer',
    component: () => import('../views/EngineerView.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
