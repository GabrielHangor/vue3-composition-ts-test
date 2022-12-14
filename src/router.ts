import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import NewPost from './components/NewPost.vue';
import ShowPost from './components/ShowPost.vue';
import EditPost from './components/EditPost.vue';
import { Store } from './store';

export const routerWithStore = (store: Store) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/posts/:id',
        component: ShowPost,
      },
      {
        path: '/posts/:id/edit',
        component: EditPost,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/posts/new',
        component: NewPost,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    const isUserAuthenticated = !!store.getState().authors.currentUserId;

    if (!to.meta.requiresAuth) {
      next();
      return;
    }

    if (to.meta.requiresAuth && isUserAuthenticated) {
      next();
    } else {
      next({ path: '/' });
    }
  });

  return router;
};
