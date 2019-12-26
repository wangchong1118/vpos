import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/vue/vpos/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
