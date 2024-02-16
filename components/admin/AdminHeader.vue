<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration } from "~/store/state";
import { storeToRefs } from "pinia";
import Avatar from "~/components/shared/Avatar.vue";

defineProps({
  sticky: Boolean,
  position: String,
});

const abpConfigStore = useAbpConfiguration();
const { config } = storeToRefs(abpConfigStore);
const name =
  config.value?.currentUser?.name?.charAt(0).toUpperCase() ||
  config.value?.currentUser?.userName?.charAt(0).toUpperCase() ||
  "N/A";

console.log(config.value?.currentUser);
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
      <Avatar :name="name" :full-name="config?.currentUser?.userName" />
      <div
        id="userDropdown"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{{ config?.currentUser?.name }}</div>
          <div class="font-medium truncate">
            {{ config?.currentUser?.email }}
          </div>
        </div>
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <NuxtLink
              to="/admin/profile"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Profile</NuxtLink
            >
          </li>
        </ul>
        <div class="py-1 text-gray-700 dark:text-gray-200">
          <a
            href="/api/auth/signout"
            class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="inline-block">
              <Icon icon="logout" :w="18" :h="18" />
            </span>
            <span class="inline-block text-sm"> Logout </span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
