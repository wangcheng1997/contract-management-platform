// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import Dashboard from './views/Dashboard.vue'
import Contracts from './views/Contracts.vue'
import ContractDetails from './views/ContractDetails.vue'
import AddContract from './views/AddContract.vue'
import EditContract from './views/EditContract.vue'
import Settings from './views/Settings.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import { useUserStore } from './stores/user'

// 配置 Supabase
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// 创建路由
const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/contracts', component: Contracts, meta: { requiresAuth: true } },
  { path: '/contracts/add', component: AddContract, meta: { requiresAuth: true } },
  { path: '/contracts/:id', component: ContractDetails, meta: { requiresAuth: true } },
  { path: '/contracts/:id/edit', component: EditContract, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  
  // 如果用户未登录且访问需要认证的页面，重定向到登录页
  if (to.meta.requiresAuth && !userStore.user) {
    return { path: '/login' }
  }
  
  // 如果用户已登录且访问登录或注册页，重定向到首页
  if ((to.path === '/login' || to.path === '/register') && userStore.user) {
    return { path: '/' }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')