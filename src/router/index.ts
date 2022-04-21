import { createRouter, createWebHistory, } from '@ionic/vue-router';
import { RouteRecordRaw, } from 'vue-router';

const baseRoutes: Array<RouteRecordRaw> = [
  /*{
    path: '/',
    redirect: '/login',
  },
  {
    path: "/login",
    component: () => import('@/components/LoginFirebasePage.vue'),
  },
  {
    path: "/workspace",
    component: () => import('@/views/MenuSplitDocument.vue'),
  },*/
  {
    path: "/workspace",
    component: () => import('@/views/MenuSplitDocument.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: baseRoutes,
})

export default router;