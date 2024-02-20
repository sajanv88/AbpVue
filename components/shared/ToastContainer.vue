<script setup lang="ts">
import Toast from "~/components/shared/Toast.vue";
import { useToast } from "~/store/state";
const toastStore = useToast();
</script>

<template>
  <section class="fixed bottom-10 right-5 abp-toast space-y-2">
    <Toast
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :type="toast.type"
      :message="toast.message"
      :autoClose="toast.autoClose"
      :autoCloseDelay="toast.autoCloseDelay"
      :dismissible="toast.dismissible"
      @dismissed="toastStore.hide(toast.id)"
    />
  </section>
</template>

<style scoped>
.abp-toast {
  z-index: 50;
}
</style>
