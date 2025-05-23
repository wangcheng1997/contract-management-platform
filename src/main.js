import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import Dashboard from '@/views/Dashboard.vue'
import Contracts from '@/views/Contracts.vue'
import ContractDetails from '@/views/ContractDetails.vue'
import AddContract from '@/views/AddContract.vue'
import EditContract from '@/views/EditContract.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import '@fortawesome/fontawesome-free/css/all.min.css';

// 配置 Supabase
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// 创建路由
const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/contracts', name: 'Contracts', component: Contracts, meta: { requiresAuth: true } },
  { path: '/contracts/add', name: 'AddContract', component: AddContract, meta: { requiresAuth: true } },
  { path: '/contracts/:id', name: 'ContractDetails', component: ContractDetails, meta: { requiresAuth: true } },
  { path: '/contracts/:id/edit', name: 'EditContract', component: EditContract, meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 适应Vercel部署
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为：导航时自动滚动到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

// 路由守卫
router.beforeEach(async (to, from) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (to.meta.requiresAuth && !user) {
    return { 
      path: '/login',
      query: { redirect: to.fullPath } // 保存原始路径，登录后重定向
    };
  }
  
  if ((to.path === '/login' || to.path === '/register') && user) {
    return { path: '/' };
  }
});

// 创建应用
const app = createApp(App);

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误捕获:', err, info);
  // 可以在这里添加错误提示
};

// 挂载应用
app.use(router);
app.mount('#app');