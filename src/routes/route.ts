import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

import Home from '@/pages/Home.vue';
import Team from '@/pages/Team.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/team',
    component: Team,
    name: 'Team'
  },
  {
    path: '/team/:id',
    component: Home
  },
  // Redirect if not found valid route
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})