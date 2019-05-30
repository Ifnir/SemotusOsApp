import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Beacon from './views/Beacon.vue';
import Elder from './views/Elder.vue';
import Check from './views/Check.vue';
import Users from './views/Users.vue';
import CreateBeacon from './views/CreateBeacon.vue';
import CreateElder from './views/CreateElder.vue';
import CreateUser from './views/CreateUser.vue';


Vue.use(Router);

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
      path: '/createbeacon',
      name: 'createbeacon',
      component: CreateBeacon,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/createelder',
      name: 'createelder',
      component: CreateElder,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/createuser',
      name: 'createuser',
      component: CreateUser,
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
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
