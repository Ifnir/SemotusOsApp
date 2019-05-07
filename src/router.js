import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Beacon from './views/Beacon.vue';
import Elder from './views/Elder.vue';
import Check from './views/Check.vue';

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
      path: '/beacon',
      name: 'beacon',
      component: Beacon,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/elder',
      name: 'elder',
      component: Elder,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/check',
      name: 'check',
      component: Check,
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
