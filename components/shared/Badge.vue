<script setup lang="ts">
interface IBadgeProps {
  color:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "gray"
    | "indigo"
    | "purple"
    | "pink";
  text: string;
}
const props = defineProps<IBadgeProps>();
const cssColor = `bg-${props.color}-100 text-gray-800 dark:bg-${props.color}-800 dark:text-white`;
</script>

<template>
  <span
    class="text-xs font-medium mx-1 py-1 px-2"
    :class="cssColor"
    :aria-label="text"
  >
    {{ props.text }}
  </span>
</template>

<style scoped></style>
