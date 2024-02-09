<script setup lang="ts">
import { useTokenSet } from "~/store/state";

definePageMeta({
  layout: "admin",
});
const token = useTokenSet();
console.log(token.accessToken);
</script>

<template>
  <h1>Admin page</h1>
</template>

<style scoped></style>
