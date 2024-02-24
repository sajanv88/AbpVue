<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration } from "~/store/state";
const abp = useAbpConfiguration();
const currentUser = abp.config?.currentUser;
console.log(currentUser?.isAuthenticated, "currentUser");
</script>

<template>
  <header class="relative">
    <nav
      class="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a
          href="/"
          class="flex flex-1 items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >AbpVue Template</span
          >
        </a>

        <div class="flex md:order-2 space-x-3 md:ml-10 rtl:space-x-reverse">
          <ThemeSwitch />

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <Icon icon="menu" />
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 space-y-2 md:space-y-0 font-medium border border-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700"
          >
            <li>
              <a
                :href="
                  currentUser?.isAuthenticated ? '/admin' : '/api/auth/signin'
                "
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >{{
                  currentUser?.isAuthenticated ? currentUser?.userName : "Login"
                }}</a
              >
            </li>
            <li v-show="!currentUser?.isAuthenticated">
              <a
                href="/api/auth/signup"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Register</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
