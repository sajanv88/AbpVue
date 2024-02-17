<script setup lang="ts">
import FilterContainer from "~/components/admin/FilterContainer.vue";

const saasSlugs = ["roles", "users"] as const;
type Slug = (typeof saasSlugs)[number];
definePageMeta({
  layout: "admin",
  middleware: "auth",
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
      :key="slug"
      :newBtnName="`New ${slug === 'roles' ? 'Role' : 'User'}`"
      searchType="roles"
      searchPlaceholder="Search..."
    />
    <main>
      <h1>Identity {{ slug }}</h1>
    </main>
  </section>
</template>

<style scoped></style>
