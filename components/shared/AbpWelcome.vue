<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Card from "~/components/shared/Card.vue";
</script>

<template>
  <section class="grid gap2 pb-10">
    <header class="p-4">
      <div class="flex items-center w-full justify-center p-3 md:p-0 space-x-2">
        <Icon
          icon="rocket-takeoff"
          :w="48"
          :h="48"
          classname="dark:text-white"
        />
        <p class="text-lg md:text-xl text-gray-800 dark:text-white">
          Congratulations!! AbpVue Template is successfully running.
        </p>
      </div>
    </header>
    <section class="flex justify-center pt-5">
      <Card rounded>
        <div class="grid gap-3 md:grid-cols-8">
          <div class="col-span-4">
            <h1
              class="text-4xl block pb-10 text-center md:hidden font-semibold bg-gradient-to-tr from-cyan-300 to-indigo-600 bg-clip-text text-transparent"
            >
              Mastering Abp Framework
            </h1>
            <img
              src="/mastering-abp-framework.webp"
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
