import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Front from '@/components/Home/Front.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/front',
      name: 'front',
      component: Front,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
