<template>
  <header class="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300" :class="{'shadow-md': scrolled}">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- 左侧logo和标题 -->
      <div class="flex items-center space-x-2">
        <i class="fa-solid fa-file-contract text-primary text-2xl"></i>
        <h1 class="text-xl font-bold text-primary">合同管理系统</h1>
      </div>

      <!-- 桌面导航栏 -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="text-gray-700 hover:text-primary transition-colors">首页</router-link>
        <router-link to="/contracts" class="text-gray-700 hover:text-primary transition-colors">合同管理</router-link>
        <router-link to="/settings" class="text-gray-700 hover:text-primary transition-colors">统计分析</router-link>
        <router-link to="/settings" class="text-gray-700 hover:text-primary transition-colors">设置</router-link>
      </div>

      <!-- 用户操作区 -->
      <div class="flex items-center space-x-4">
        <!-- 移动端菜单按钮 -->
        <button
          class="md:hidden text-gray-700 hover:text-primary"
          @click="toggleMobileMenu"
        >
          <i class="fa-solid fa-bars text-xl"></i>
        </button>

        <!-- 用户头像和菜单 -->
        <div class="relative">
          <button
            class="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
            @click="toggleUserMenu"
          >
            <img
              src="https://picsum.photos/id/64/40/40"
              alt="用户头像"
              class="w-8 h-8 rounded-full object-cover border-2 border-primary"
            />
            <span class="hidden md:inline">管理员</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>

          <!-- 用户下拉菜单（移动端） -->
          <div
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md py-2"
            v-show="mobileUserMenuOpen"
            @click.away="mobileUserMenuOpen = false"
          >
            <router-link
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i class="fa-solid fa-gear mr-2"></i> 设置
            </router-link>
            <button
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="logout"
            >
              <i class="fa-solid fa-right-from-bracket mr-2"></i> 退出登录
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div
      class="md:hidden bg-white border-t animate-fadeIn"
      v-show="mobileMenuOpen"
    >
      <div class="container mx-auto px-4 py-2">
        <router-link to="/" class="block py-2 text-gray-700 hover:text-primary transition-colors">
          <i class="fa-solid fa-home mr-2"></i> 首页
        </router-link>
        <router-link to="/contracts" class="block py-2 text-gray-700 hover:text-primary transition-colors">
          <i class="fa-solid fa-file-contract mr-2"></i> 合同管理
        </router-link>
        <router-link to="/settings" class="block py-2 text-gray-700 hover:text-primary transition-colors">
          <i class="fa-solid fa-chart-line mr-2"></i> 统计分析
        </router-link>
        <router-link to="/settings" class="block py-2 text-gray-700 hover:text-primary transition-colors">
          <i class="fa-solid fa-gear mr-2"></i> 设置
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

// 状态管理
const router = useRouter();
const userStore = useUserStore();
const mobileMenuOpen = ref(false);
const mobileUserMenuOpen = ref(false);
const scrolled = ref(false);

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// 切换用户菜单
const toggleUserMenu = () => {
  mobileUserMenuOpen.value = !mobileUserMenuOpen.value;
};

// 监听滚动事件
window.addEventListener('scroll', () => {
  scrolled.value = window.scrollY > 10;
});

// 退出登录
const logout = async () => {
  try {
    await userStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('退出登录失败:', error);
  }
};
</script>

<style scoped>
/* 移动端菜单点击穿透问题修复 */
[v-cloak] {
  display: none;
}
</style>