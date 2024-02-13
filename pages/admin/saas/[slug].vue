<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import FilterContainer from "~/components/admin/FilterContainer.vue";
import {
  useAbpConfiguration,
  useDeleteDialog,
  useTenants,
} from "~/store/state";

import Table from "~/components/shared/Table.vue";
import type { ActionCtaDataType } from "~/components/shared/Table.vue";
import Pagination from "~/components/shared/Pagination.vue";
import DeleteDialog from "~/components/shared/DeleteDialog.vue";

// Include editions, etc..
const saasSlugs = ["tenants"] as const;
type Slug = (typeof saasSlugs)[number];
type ReturnConfig = {
  headers: Array<{ name: string }>;
  columns: Array<{ name: string; id: string }>;
  actionCtaBtnProps: { name: string; options: Array<{ name: string }> };
};
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const {
  params: { slug },
} = useRoute();
const paramSlug: Slug = slug as Slug;

const tenantStore = useTenants();
const abpConfigStore = useAbpConfiguration();
const deleteDialogStore = useDeleteDialog();
const { tenants, totalCount, isLoading } = storeToRefs(tenantStore);
const { isOpen } = storeToRefs(deleteDialogStore);

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

const tenantPolicies = () => {
  const canDeleteTenant = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsDelete",
  );
  const canUpdateTenant = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsUpdate",
  );
  const canManageFeatures = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsManageFeatures",
  );
  return { canDeleteTenant, canUpdateTenant, canManageFeatures };
};

// Update your code for editions etc..
const slugMapper: Record<Slug, () => ReturnConfig> = {
  tenants: () => {
    const headers: Array<{ name: string }> = [
      {
        name: "Actions",
      },
      {
        name: "TenantName",
      },
    ];
    const columns: Array<{ name: string; id: string }> = [];

    const { canDeleteTenant, canUpdateTenant, canManageFeatures } =
      tenantPolicies();
    const actionCtaBtnProps: ReturnConfig["actionCtaBtnProps"] = {
      name: "Actions",
      options: [],
    };
    if (canDeleteTenant) {
      actionCtaBtnProps.options.push({ name: "Delete" });
    }
    if (canUpdateTenant) {
      actionCtaBtnProps.options.push({ name: "Edit" });
    }
    if (canManageFeatures) {
      actionCtaBtnProps.options.push({ name: "Settings" });
    }

    return { headers, actionCtaBtnProps, columns };
  },
};
const onTableActionEvent = async ({
  data: { invokedBy, value },
}: {
  data: ActionCtaDataType;
}) => {
  console.log({ invokedBy, value });
  if (invokedBy === "Delete") {
    await deleteDialogStore.showDialog(
      value.id,
      `${value.name} will be deleted. Do you confirm that?`,
    );
  }
};

const config = ref(slugMapper[paramSlug]());

const updateTenants = (params: typeof tenants) => {
  if (paramSlug == "tenants" && params.value) {
    for (const param of params.value) {
      config.value.columns.push({ name: param.name!, id: param.id! });
    }
  }
};

updateTenants(tenants);

watch(tenants, () => {
  config.value.columns = [];
  const t: typeof tenants = tenants;
  updateTenants(t);
});

watch(totalCount, () => {
  enablePagination.value = totalCount.value > config.value.columns.length;
});

enablePagination.value = totalCount.value > config.value.columns.length;

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
    <Teleport to="body">
      <DeleteDialog :type="paramSlug" v-if="isOpen" />
    </Teleport>

    <FilterContainer
      :slug="slug"
      newBtnName="New Tenant"
      searchType="tenants"
      searchPlaceholder="Search..."
    />
    <main>
      <Table
        :is-loading="isLoading"
        :headers="config.headers"
        :columns="config.columns"
        :action-cta="config.actionCtaBtnProps"
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
