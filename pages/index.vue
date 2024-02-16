<script setup lang="ts">
import DefaultNav from "~/components/shared/DefaultNav.vue";
import AbpWelcome from "~/components/shared/AbpWelcome.vue";
import GetStarted from "~/components/shared/GetStarted.vue";
import AbpFooter from "~/components/shared/AbpFooter.vue";
</script>

<template>
  <DefaultNav />
  <section class="bg-gray-200 dark:bg-gray-800">
    <main class="max-w-screen-xl mx-auto">
      <AbpWelcome />
      <GetStarted />
    </main>
  </section>
  <AbpFooter />
</template>

<style scoped></style>
