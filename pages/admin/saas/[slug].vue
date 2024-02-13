<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import FilterContainer from "~/components/admin/FilterContainer.vue";
import { useTenants } from "~/store/state";

import Table from "~/components/shared/Table.vue";
import type { ActionCtaDataType } from "~/components/shared/Table.vue";
import Pagination from "~/components/shared/Pagination.vue";

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
const currentPage = ref(0);
const maxRecord = ref(10);
const enablePagination = ref(false);
await callOnce(async () => {
  if (paramSlug === "tenants") {
    await tenantStore.fetch({
      MaxResultCount: maxRecord.value,
      SkipCount: currentPage.value,
    });
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

watch(totalCount, () => {
  enablePagination.value = totalCount.value > columns.length;
});

enablePagination.value = totalCount.value > columns.length;

console.log(totalCount.value, "totalCount");
const onNextPage = async (page: number) => {
  currentPage.value = page;
  await tenantStore.fetch({
    MaxResultCount: maxRecord.value,
    SkipCount: currentPage.value,
  });
};
const onPreviousPage = async (page: number) => {
  currentPage.value = page;
  await tenantStore.fetch({
    MaxResultCount: maxRecord.value,
    SkipCount: currentPage.value,
  });
};
const onSelectedPage = async (page: number) => {
  currentPage.value = page;
  await tenantStore.fetch({
    MaxResultCount: maxRecord.value,
    SkipCount: currentPage.value,
  });
};

const totalPages = Math.ceil(totalCount.value / maxRecord.value);
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
      <div v-if="enablePagination">
        <Pagination
          :total-page="totalPages"
          :current-page="currentPage"
          :key="currentPage"
          @on-next-page="onNextPage"
          @on-previous-page="onPreviousPage"
          @on-selected-page="onSelectedPage"
        />
      </div>
    </main>
  </section>
</template>

<style scoped></style>
