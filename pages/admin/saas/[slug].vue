<script setup lang="ts">
import FilterContainer from "~/components/admin/FilterContainer.vue";

definePageMeta({
  layout: "admin",
});
const saasSlugs = ["tenants"] as const;
type Slug = (typeof saasSlugs)[number];
definePageMeta({
  layout: "admin",
});
const {
  params: { slug },
} = useRoute();
const paramSlug: Slug = slug as Slug;

if (!saasSlugs.includes(paramSlug)) {
  await navigateTo("/error/notfound");
}
</script>

<template>
  <section>
    <FilterContainer
      :slug="slug"
      newBtnName="New Tenant"
      searchType="tenants"
      searchPlaceholder="Search..."
    />
    <main>
      <h1>Saas {{ slug }}</h1>
    </main>
  </section>
</template>

<style scoped></style>
