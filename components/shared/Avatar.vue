<script setup lang="ts">
interface IAvtarProps {
  name: string;
  fullName: string;
}
defineProps<IAvtarProps>();
</script>

<template>
  <section
    class="relative"
    type="button"
    data-dropdown-toggle="userDropdown"
    data-dropdown-placement="bottom-start"
  >
    <div
      class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
    >
      <span class="sr-only">{{ fullName }}</span>
      <span class="font-medium text-gray-600 dark:text-gray-300 select-none">{{
        name
      }}</span>
    </div>
  </section>
</template>

<style scoped></style>
