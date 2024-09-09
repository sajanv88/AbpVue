<script setup lang="ts">
import { useDashboard } from "~/store/state";
import SimpleLineChart from "~/abp/charts/SimpleLineChart.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const dashboardStore = useDashboard();
await dashboardStore.fetch();
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <section class="grid grid-cols-3">
      <section>
        <SimpleLineChart :data="dashboardStore.data" />
      </section>
    </section>
  </div>
</template>

<style scoped></style>
