<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import FilterContainer from "~/components/admin/FilterContainer.vue";
import { useTenants } from "~/store/state";

import Table from "~/components/shared/Table.vue";
import type { ActionCtaDataType } from "~/components/shared/Table.vue";

// Include editions, etc..
const saasSlugs = ["tenants"] as const;
type Slug = (typeof saasSlugs)[number];
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const {
  params: { slug },
} = useRoute();
const paramSlug: Slug = slug as Slug;

const tenantStore = useTenants();
const { tenants, totalCount, isLoading } = storeToRefs(tenantStore);
await callOnce(async () => {
  if (paramSlug === "tenants") {
    await tenantStore.fetch();
  }
});

if (!saasSlugs.includes(paramSlug)) {
  await navigateTo("/error/notfound");
}

const onTableActionEvent = ({
  data: { invokedBy, value },
}: {
  data: ActionCtaDataType;
}) => {
  console.log({ invokedBy, value });
};

// Update your code for editions etc..
const headers: Array<{ name: string }> = [
  {
    name: "Actions",
  },
  {
    name: "TenantName",
  },
];

let columns: Array<{ name: string; id: string }> = [];
const updateTenants = (params: typeof tenants) => {
  if (paramSlug == "tenants" && params.value) {
    for (const param of params.value) {
      columns.push({ name: param.name!, id: param.id! });
    }
  }
};

updateTenants(tenants);

const actionCtaBtnProps = {
  name: "Actions",
};

watch(tenants, () => {
  columns = [];
  const t: typeof tenants = tenants;
  updateTenants(t);
});
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
      <Table
        :is-loading="isLoading"
        :headers="headers"
        :columns="columns"
        :action-cta="actionCtaBtnProps"
        @on-Action="onTableActionEvent"
      />
      <span>{{ totalCount }}</span>
    </main>
  </section>
</template>

<style scoped></style>
