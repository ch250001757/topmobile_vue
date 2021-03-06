import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import('@/views/tabBar'),
    children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video'),
      },
      {
        path: 'ask',
        name: 'ask',
        component: () => import('@/views/ask'),
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/list/:key',
    component: () => import('@/views/list')
  },
  {
    path: '/detail/:art_id',
    component: () => import('@/views/detail')
  },
  {
    path: '/gundong',
    component: () => import('@/views/test/gundongT')
  },
  {
    path: '/qrcode',
    component: () => import('@/views/test/qrcode')
  },

]

const router = new VueRouter({
  routes
})

export default router