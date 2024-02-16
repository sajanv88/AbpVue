<script setup lang="ts">
import Welcome from "~/components/shared/Welcome.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<template>
  <Welcome />
</template>

<style scoped></style>
