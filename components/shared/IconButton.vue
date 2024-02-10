<script setup lang="ts">
interface IconButtonProps {
  classname?: string;
}
const props = defineProps<IconButtonProps>();
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 dark:text-white text-gray-900 focus:outline-none border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    :class="props.classname"
  >
    <slot />
  </button>
</template>

<style scoped></style>
