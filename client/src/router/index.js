import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/auth/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/auth/Register.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/forms/create',
    name: 'CreateForm',
    component: () => import('../views/form/Create.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/forms/:id',
    name: 'Form',
    component: () => import('../views/auth/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (document.cookie.length > 0 && !store.getters.isAuthenticated) {
    await store.dispatch('getUser');
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isAuthenticated) {
      next();
    } else {
      next({
        name: 'dashboard',
      });
    }
  } else {
    next();
  }
});

export default router;
