// src/composables/useToast.js
import { ref } from 'vue';

export const useToast = () => {
  const toast = ref({
    show: false,
    type: 'default',
    message: '',
  });

  const show = (type, message, duration = 3000) => {
    toast.value = { show: true, type, message };
    setTimeout(() => { toast.value.show = false; }, duration);
  };

  const hide = () => {
    toast.value.show = false;
  };

  return {
    toast,
    showToast: show,
    hideToast: hide,
  };
};