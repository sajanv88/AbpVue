<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";

interface IAlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  dismissible?: boolean;
}
defineProps<IAlertProps>();
const styles: Record<IAlertProps["type"], string> = {
  info: "text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800",
  success:
    "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800",
  error:
    "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800",
  warning:
    "text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:bg-gray-800 dark:border-yellow-800",
};
</script>

<template>
  <section
    class="flex items-center p-4 mb-4 border-t-4"
    :class="styles[type]"
    role="alert"
  >
    <Icon icon="info-circle" />
    <p class="ms-3 text-sm font-medium">
      {{ message }}
    </p>
    <button
      v-if="dismissible"
      @click="$emit('dismissed')"
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#alert-border-1"
      aria-label="Close"
    >
      <span class="sr-only">Dismiss</span>
      <Icon icon="cross" />
    </button>
  </section>
</template>

<style scoped></style>
