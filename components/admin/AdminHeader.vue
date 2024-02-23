<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration, useNavigation } from "~/store/state";
import { storeToRefs } from "pinia";
import Avatar from "~/components/shared/Avatar.vue";
import IconButton from "~/components/shared/IconButton.vue";

defineProps({
  sticky: Boolean,
  position: String,
});

const abpConfigStore = useAbpConfiguration();
const navStore = useNavigation();
const { config } = storeToRefs(abpConfigStore);
const emit = defineEmits(["toggleNav"]);
const name = computed(() => {
  return (
    config.value?.currentUser?.name?.charAt(0).toUpperCase() ||
    config.value?.currentUser?.userName?.charAt(0).toUpperCase() ||
    "N/A"
  );
});
const fullName = computed(() => {
  if (config.value?.currentUser?.name && config.value?.currentUser?.surName) {
    return `${config.value?.currentUser?.name} ${config.value?.currentUser?.surName}`;
  }
  if (config.value?.currentUser?.name) {
    return config.value?.currentUser?.name;
  }
  return config.value?.currentUser?.userName;
});

const onMenuClickEvent = () => {
  navStore.toggleSideNavbar();
  emit("toggleNav");
};
</script>

<template>
  <header class="w-full p-3 bg-gray-200 dark:bg-gray-800">
    <div class="flex items-center h-full">
      <div class="flex-1">
        <h1
          class="hidden md:block text-lg pt-5 pb-5 tracking-tight font-semibold capitalize text-gray-900 md:text-xl lg:text-2xl dark:text-white"
        >
          {{ fullName }}
        </h1>
        <IconButton @click="onMenuClickEvent" classname="inline md:hidden">
          <Icon icon="menu" />
        </IconButton>
      </div>

      <ThemeSwitch />

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
