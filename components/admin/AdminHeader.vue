<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";

defineProps({
  sticky: Boolean,
  position: String,
});
</script>

<template>
  <header
    class="w-full mb-3 md:h-16 bg-gray-200 dark:bg-gray-800 shadow-md md:pr-5"
  >
    <div class="flex items-center h-full" :class="position">
      <div class="flex-1 pl-2 md:pl-5">
        <h1
          class="text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white"
        >
          AbpVue Template
        </h1>
      </div>
      <ClientOnly fallback="...">
        <ThemeSwitch />
      </ClientOnly>

      <a
        href="/api/auth/signout"
        class="flex items-center p-2 space-x-2 text-gray-500 dark:text-white dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 text-sm"
      >
        <span class="inline-block">
          <Icon icon="logout" />
        </span>
        <span class="inline-block"> Logout </span>
      </a>
    </div>
  </header>
</template>

<style scoped></style>
