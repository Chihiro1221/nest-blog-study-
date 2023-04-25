import { RouteRecordRaw } from 'vue-router'
export default {
  path: '/',
  component: () => import('@/layouts/front.vue'),
  children: [
    {
      name: 'article.index',
      path: '',
      component: () => import('@/views/article/index.vue'),
    },
    {
      name: 'article.create',
      path: 'create',
      component: () => import('@/views/article/create.vue'),
    },
    {
      name: 'article.update',
      path: 'update/:id',
      component: () => import('@/views/article/update.vue'),
    },
  ],
} as RouteRecordRaw
