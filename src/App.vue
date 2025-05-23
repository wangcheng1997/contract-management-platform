<!-- src/views/Contracts.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <AppHeader />
    
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 class="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800">合同管理</h2>
          <p class="text-gray-500 mt-1">管理所有项目合同、进度和收款信息</p>
        </div>
        
        <button class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center" @click="navigateToAddContract">
          <i class="fa-solid fa-plus mr-2"></i>
          <span>新增合同</span>
        </button>
      </div>
      
      <!-- 筛选区域 -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
            <input type="text" v-model="searchQuery" placeholder="搜索项目..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">合同状态</label>
            <select v-model="statusFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
              <option value="">全部状态</option>
              <option value="进行中">进行中</option>
              <option value="已完成">已完成</option>
              <option value="逾期">逾期</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">开工日期范围</label>
            <input type="date" v-model="startDateFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">结束日期范围</label>
            <input type="date" v-model="endDateFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          
          <div class="flex items-end">
            <button class="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center" @click="filterContracts">
              <i class="fa-solid fa-filter mr-2"></i>
              <span>筛选</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 合同列表 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">合同编号</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开工日期</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束日期</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">合同金额</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">已收款</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收款进度</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="contract in filteredContracts" :key="contract.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <i class="fa-solid fa-building text-primary"></i>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ contract.project_name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contract.contract_number }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contract.start_date }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contract.end_date }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">¥{{ contract.contract_amount.toLocaleString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">¥{{ contract.received_amount.toLocaleString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div :class="getProgressBarClass(contract)" class="h-2.5 rounded-full" :style="{ width: `${contract.payment_progress}%` }"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ contract.payment_progress }}%</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(contract.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ contract.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-primary hover:text-primary/80 mr-3" @click="navigateToEditContract(contract.id)">
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button class="text-danger hover:text-danger/80" @click="confirmDelete(contract.id)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button class="text-success hover:text-success/80" @click="navigateToDetails(contract.id)">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 -->
        <div class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              上一页
            </button>
            <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              下一页
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示 <span class="font-medium">{{ filteredContracts.length }}</span> 条，共 <span class="font-medium">{{ contracts.length }}</span> 条记录
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">上一页</span>
                  <i class="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                  1
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">下一页</span>
                  <i class="fa-solid fa-chevron-right text-xs"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getContracts, deleteContract } from '@/services/contracts'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const { showToast } = useToast()

// 状态管理
const contracts = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const startDateFilter = ref('')
const endDateFilter = ref('')
const loading = ref(false)
const error = ref(null)

// 获取合同列表
const fetchContracts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await getContracts()
    contracts.value = data.map(contract => ({
      ...contract,
      payment_progress: Math.round((contract.received_amount / contract.contract_amount) * 100)
    }))
  } catch (err) {
    error.value = err.message
    showToast('error', '获取合同列表失败，请重试')
  } finally {
    loading.value = false
  }
}

// 计算属性：筛选后的合同
const filteredContracts = computed(() => {
  let filtered = contracts.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(contract => 
      contract.project_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value) {
    filtered = filtered.filter(contract => contract.status === statusFilter.value)
  }
  
  if (startDateFilter.value) {
    filtered = filtered.filter(contract => contract.start_date >= startDateFilter.value)
  }
  
  if (endDateFilter.value) {
    filtered = filtered.filter(contract => contract.end_date <= endDateFilter.value)
  }
  
  return filtered
})

// 导航函数
const navigateToAddContract = () => {
  router.push('/contracts/add')
}

const navigateToEditContract = (id) => {
  router.push(`/contracts/${id}/edit`)
}

const navigateToDetails = (id) => {
  router.push(`/contracts/${id}`)
}

// 删除合同
const confirmDelete = (id) => {
  if (confirm('确定要删除此合同吗？此操作不可撤销。')) {
    deleteContract(id)
      .then(() => {
        contracts.value = contracts.value.filter(contract => contract.id !== id)
        showToast('success', '合同已成功删除')
      })
      .catch(err => {
        error.value = err.message
        showToast('error', '删除合同失败，请重试')
      })
  }
}

// 筛选合同
const filterContracts = () => {
  // 筛选逻辑已在computed属性中实现
}

// 获取进度条样式
const getProgressBarClass = (contract) => {
  if (contract.payment_progress >= 100) return 'bg-success'
  if (contract.payment_progress >= 75) return 'bg-primary'
  if (contract.payment_progress >= 50) return 'bg-warning'
  return 'bg-danger'
}

// 获取状态徽章样式
const getStatusBadgeClass = (status) => {
  switch(status) {
    case '进行中': return 'bg-primary/10 text-primary';
    case '已完成': return 'bg-success/10 text-success';
    case '逾期': return 'bg-danger/10 text-danger';
    default: return 'bg-gray/10 text-gray';
  }
}

// 生命周期钩子
onMounted(() => {
  fetchContracts()
})
</script>