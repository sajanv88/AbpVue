<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration } from "~/store/state";
import Alert from "~/components/shared/Alert.vue";
import ThemeSwitch from "~/components/shared/ThemeSwitch.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/abp/ui/dropdown-menu";
const abp = useAbpConfiguration();
const currentUser = abp.config?.currentUser;

const toggleNav = ref(false);
</script>

<template>
  <header class="relative">
    <nav class="bg-background fixed w-full z-20 top-0 start-0">
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
          <div class="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  type="button"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                  variant="ghost"
                  size="icon"
                  @click="toggleNav = !toggleNav"
                >
                  <span class="sr-only">Open main menu</span>
                  <Icon icon="menu" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a
                    :href="
                      currentUser?.isAuthenticated
                        ? '/admin'
                        : '/api/auth/signin'
                    "
                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >{{
                      currentUser?.isAuthenticated
                        ? currentUser?.userName
                        : "Login"
                    }}</a
                  >
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    :href="
                      currentUser?.isAuthenticated
                        ? '/api/auth/signout'
                        : '/api/auth/signup'
                    "
                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >{{
                      currentUser?.isAuthenticated ? "Logout" : "Register"
                    }}</a
                  >
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          class="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden md:block"
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
            <li>
              <a
                :href="
                  currentUser?.isAuthenticated
                    ? '/api/auth/signout'
                    : '/api/auth/signup'
                "
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >{{ currentUser?.isAuthenticated ? "Logout" : "Register" }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!--  Remove this Alert component when you are using it on production env  -->
      <section class="px-2">
        <Alert
          type="warning"
          message="Please note that the following application is intended solely for demonstration purposes."
          :notice="true"
        />
      </section>
    </nav>
  </header>
</template>

<style scoped></style>
