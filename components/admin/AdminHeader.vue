<script setup lang="ts">
defineProps({
  sticky: Boolean,
  position: String,
});
</script>

<template>
  <header
    class="w-full h-16 bg-gray-200 dark:bg-gray-800"
    :class="sticky ? 'sticky' : ''"
  >
    <div class="container flex items-center h-full pr-5" :class="position">
      <ClientOnly fallback="...">
        <ThemeSwitch />
      </ClientOnly>
      <a
        href="/api/auth/signout"
        class="block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 text-sm p-2.5"
        >Logout</a
      >
    </div>
  </header>
</template>

<style scoped></style>
