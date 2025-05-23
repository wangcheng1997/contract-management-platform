<!-- src/components/Toast.vue -->
<template>
  <div
    v-show="toast.show"
    :class="`toast-${toast.type} ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`"
    class="fixed bottom-4 right-4 z-50 transition-all duration-300 ease-out bg-white shadow-lg rounded-lg px-4 py-3 flex items-center space-x-2"
  >
    <div :class="iconClass"></div>
    <p class="text-sm font-medium text-gray-800">{{ toast.message }}</p>
    <button
      class="ml-auto text-gray-500 hover:text-gray-700"
      @click="hideToast"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast';

const { toast, hideToast } = useToast();

const iconClass = computed(() => {
  switch (toast.type) {
    case 'success': return 'text-green-500 fa-solid fa-circle-check';
    case 'error': return 'text-red-500 fa-solid fa-circle-xmark';
    case 'warning': return 'text-yellow-500 fa-solid fa-circle-exclamation';
    default: return 'text-gray-500 fa-solid fa-info-circle';
  }
});
</script>

<style scoped>
.toast-success {
  border-left: 4px solid #00B42A;
}

.toast-error {
  border-left: 4px solid #F53F3F;
}

.toast-warning {
  border-left: 4px solid #FF7D00;
}

.toast-default {
  border-left: 4px solid #86909C;
}

.toast {
  opacity: 0;
  transform: translateY(4px);
}
</style>