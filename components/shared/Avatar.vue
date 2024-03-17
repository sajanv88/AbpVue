<script setup lang="ts">
interface IAvtarProps {
  name: string;
  fullName: string;
}
defineProps<IAvtarProps>();
</script>

<template>
  <section class="relative" type="button">
    <div
      class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full bg-secondary"
    >
      <span class="sr-only">{{ fullName }}</span>
      <span class="font-medium select-none">{{ name }}</span>
    </div>
  </section>
</template>

<style scoped></style>
