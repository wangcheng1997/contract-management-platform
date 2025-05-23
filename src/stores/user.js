// src/stores/user.js
import { ref, computed } from 'vue'
import { supabase } from '../main'

export const useUserStore = () => {
  const user = ref(null)
  const loading = ref(true)
  
  // 初始化用户状态
  const init = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
    loading.value = false
  }
  
  // 登录
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    user.value = data.user
    return data
  }
  
  // 注册
  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    if (error) throw error
    user.value = data.user
    return data
  }
  
  // 登出
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
    user.value = null
  }
  
  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    init,
    login,
    register,
    logout
  }
}