import { createRouter,createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index'], resolve)
  }
]

