import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MenuSplitDocument from '../views/MenuSplitDocument.vue'

const routes: Array<RouteRecordRaw> =[
  {
    path: '/',
    redirect: '/docs/tutorial'
  },
  {
    path: '/docs/',
    component: MenuSplitDocument,
    children: [//this should be the first page used as a tutorial**********************************************************************
      {
        path: '',
        redirect: '/docs/tutorial'
      },
      {
        path: 'tutorial',
        component: () => import('@/views/CurrentDocument.vue')
      },
    ]
  }];

function createDocument (title: string) {
   routes.push(
    {
      path: '/docs/',
      component: MenuSplitDocument,
      children: [
        {
          path: '',
          redirect: '/docs/'+title
        },
        {
          path: title,
          component: () => import('@/views/CurrentDocument.vue')
        },
      ]
    }
  )  
  return routes;
}


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes && createDocument("document1") &&  createDocument("document2")
})

export default router
