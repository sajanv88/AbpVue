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

const variant = {
  blue: "bg-blue-100 text-foreground dark:bg-blue-800",
  green: "bg-green-100 text-foreground dark:bg-green-800",
  yellow: "bg-yellow-100 text-foreground dark:bg-yellow-800",
  gray: "bg-gray-100 text-foreground dark:bg-gray-800",
  indigo: "bg-indigo-100 text-foreground dark:bg-indigo-800",
  purple: "bg-purple-100 text-foreground dark:bg-purple-800",
  pink: "bg-pink-100 text-foreground dark:bg-pink-800",
  red: "bg-red-100 text-foreground dark:bg-red-800",
};
</script>

<template>
  <span
    class="text-xs font-medium mx-1 py-1 px-2 truncate"
    :class="variant[props.color]"
    :aria-label="text"
  >
    {{ props.text }}
  </span>
</template>

<style scoped></style>
