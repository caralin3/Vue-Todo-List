import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import Login from './components/Login.vue';

Vue.use(Router);

export const router: any = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login',
    }, {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    }, {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: ForgotPassword,
    }, {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Projects" */ './views/Projects.vue'),
      meta: {
        requiresAuth: true,
      },
    }, {
      path: '/projects/:id',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to: any, from: any, next: any) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record: any) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('projects');
  } else {
    next();
  }
});

export default router;
