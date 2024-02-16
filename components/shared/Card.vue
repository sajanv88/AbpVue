<script setup lang="ts">
interface ICardProps {
  rounded?: boolean;
}
defineProps<ICardProps>();
</script>

<template>
  <section
    class="p-3 md:max-w-screen-2xl md:p-6 bg-white dark:bg-gray-800 border border-gray-200 shadow dark:border-gray-700"
    :class="rounded ? 'rounded-lg' : ''"
  >
    <slot />
  </section>
</template>

<style scoped></style>
