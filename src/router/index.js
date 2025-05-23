// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Contracts from '@/views/Contracts.vue';
import ContractDetails from '@/views/ContractDetails.vue';
import AddContract from '@/views/AddContract.vue';
import EditContract from '@/views/EditContract.vue';
import Settings from '@/views/Settings.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

// 路由定义
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // 标记需要认证的页面
  },
  {
    path: '/contracts',
    name: 'Contracts',
    component: Contracts,
    meta: { requiresAuth: true },
  },
  {
    path: '/contracts/add',
    name: 'AddContract',
    component: AddContract,
    meta: { requiresAuth: true },
  },
  {
    path: '/contracts/:id',
    name: 'ContractDetails',
    component: ContractDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/contracts/:id/edit',
    name: 'EditContract',
    component: EditContract,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 适应Vercel部署
  routes,
});

// 导航守卫：验证用户认证状态
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null; // 简单认证状态判断
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // 未认证用户重定向到登录页
  } else {
    next(); // 允许访问
  }
});

export default router;