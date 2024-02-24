<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Card from "~/components/shared/Card.vue";
import { useAbpConfiguration } from "~/store/state";
const abp = useAbpConfiguration();
const currentUser = abp.config?.currentUser;
</script>

<template>
  <section class="grid gap2 pb-10">
    <header class="p-4">
      <div
        class="flex flex-col w-full justify-center items-center p-3 md:p-0 space-x-2 space-y-2"
      >
        <Icon
          icon="rocket-takeoff"
          :w="48"
          :h="48"
          classname="dark:text-white"
        />
        <p class="text-md md:text-xl text-gray-800 dark:text-white">
          <span v-show="!currentUser?.isAuthenticated" class="block text-xl">
            Abp.io UI template for Nuxt.js
            <span class="block text-center pt-2 pb-2">
              <NuxtLink
                to="https://github.com/sajanv88/AbpVue"
                target="_blank"
                rel="noopener"
                class="text-white bg-gray-600 hover:bg-gray-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
              >
                <svg
                  class="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Github
              </NuxtLink>
            </span>
          </span>
          <span v-show="currentUser?.isAuthenticated" class="block">
            <span class="block text-center">
              Welcome, {{ currentUser?.userName }}
            </span>
            <span class="block text-center">
              Congratulations!! AbpVue Template is successfully running.
            </span>
          </span>
        </p>
      </div>
    </header>
    <section class="flex justify-center pt-5">
      <Card :rounded="true">
        <div class="grid gap-3 md:grid-cols-8">
          <div class="col-span-4">
            <h1
              class="text-4xl block pb-10 text-center md:hidden font-semibold bg-gradient-to-tr from-cyan-300 to-indigo-600 bg-clip-text text-transparent"
            >
              Mastering Abp Framework
            </h1>
            <img
              src="~assets/img/mastering-abp-framework.webp"
              width="300"
              height="300"
              loading="lazy"
              class="w-full h-auto"
              alt="Mastering Abp Framework"
            />
          </div>
          <div class="col-span-4 md:self-center">
            <h1
              class="text-4xl hidden md:block font-semibold bg-gradient-to-tr from-cyan-300 to-indigo-600 bg-clip-text text-transparent"
            >
              Mastering Abp Framework
            </h1>
            <p class="mt-5 text-lg text-gray-600 dark:text-gray-400">
              Written by the creator of the ABP Framework, this book will help
              you gain a complete understanding of the framework and modern web
              application development techniques.
            </p>
            <div class="flex justify-center pt-5">
              <a
                href="https://abp.io/books/mastering-abp-framework"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >Read More</a
              >
            </div>
          </div>
        </div>
      </Card>
    </section>
  </section>
</template>

<style scoped></style>
