<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import DefaultNav from "~/components/shared/DefaultNav.vue";
import AbpFooter from "~/components/shared/AbpFooter.vue";
import { useAbpConfiguration } from "~/store/state";
const abp = useAbpConfiguration();
abp.fetch();
</script>

<template>
  <SpeedInsights />
  <DefaultNav />
  <slot />
  <AbpFooter />
</template>

<style scoped></style>
