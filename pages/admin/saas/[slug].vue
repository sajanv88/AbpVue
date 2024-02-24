<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import FilterContainer from "~/components/admin/FilterContainer.vue";
import { useDeleteDialog, useFeatures, useTenants } from "~/store/state";

import Table from "~/components/shared/Table.vue";
import type { ActionCtaDataType } from "~/components/shared/Table.vue";
import Pagination from "~/components/shared/Pagination.vue";
import DeleteDialog from "~/components/shared/DeleteDialog.vue";
import CreateTenant from "~/components/admin/tenant/CreateTenant.vue";
import TenantFeatureManagement from "~/components/admin/tenant/TenantFeatureManagement.vue";

import { useTenantPolicy } from "~/composables/useTenantPolicy";
import Alert from "~/components/shared/Alert.vue";

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

if (!saasSlugs.includes(paramSlug)) {
  await navigateTo("/error/notfound");
}

const tenantStore = useTenants();
const deleteDialogStore = useDeleteDialog();
const featureStore = useFeatures();
const { tenants, totalCount, isLoading } = storeToRefs(tenantStore);
const { isOpen } = storeToRefs(deleteDialogStore);

const currentPage = ref(0);
const maxRecord = ref(10);
const enablePagination = ref(false);

// Pagination for tenant list
const paginateTenants = async () => {
  await tenantStore.fetch({
    MaxResultCount: maxRecord.value,
    SkipCount: currentPage.value,
  });
};

await callOnce(async () => {
  if (paramSlug === "tenants") {
    await paginateTenants();
  }
});

const tenantPolicies = useTenantPolicy();

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
      {
        name: "",
      },
      {
        name: "",
      },
    ];
    const columns: Array<{ name: string; id: string }> = [];

    const { canDeleteTenant, canUpdateTenant, canManageFeatures } =
      tenantPolicies;
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
  if (invokedBy === "Delete") {
    return await deleteDialogStore.showDialog(
      value.id,
      `${value.name} will be deleted. Do you confirm that?`,
    );
  }

  if (invokedBy === "Edit") {
    if (paramSlug === "tenants") {
      // Trigger the tenant edit dialog
      return await tenantStore.getSelectedTenant(value.id);
    }
  }
  if (invokedBy === "Settings") {
    if (paramSlug === "tenants") {
      // Trigger the tenant feature management dialog
      return await featureStore.fetch(value.id);
    }
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

// Tenant list watcher..
watch(tenants, () => {
  config.value.columns = [];
  const t: typeof tenants = tenants;
  updateTenants(t);
});

watch(totalCount, () => {
  enablePagination.value = totalCount.value > config.value.columns.length;
});

enablePagination.value = totalCount.value > config.value.columns.length;

const onPageChangeEvent = async (page: number) => {
  currentPage.value = page;
  if (paramSlug === "tenants") {
    return await paginateTenants();
  }
};

const totalPages = computed(() =>
  Math.ceil(totalCount.value / maxRecord.value),
);
</script>

<template>
  <section>
    <Alert
      type="error"
      :message="tenantStore.error.message"
      v-if="tenantStore.error"
      :dismissible="true"
    />
    <Teleport to="body">
      <DeleteDialog :type="paramSlug" v-if="isOpen" />
      <CreateTenant
        :open="!!tenantStore.selectedTenant.data"
        :edit="true"
        @dialog-close="tenantStore.resetSelectedTenant()"
      />
      <TenantFeatureManagement
        :open="!!featureStore.featureGroups"
        @dialog-close="featureStore.resetFeatures()"
      />
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
        :is-no-data="tenants?.length === 0"
      />
      <div v-if="enablePagination">
        <Pagination
          :total-page="totalPages"
          :current-page="currentPage"
          :key="currentPage"
          @on-next-page="onPageChangeEvent"
          @on-previous-page="onPageChangeEvent"
          @on-selected-page="onPageChangeEvent"
        />
      </div>
    </main>
  </section>
</template>

<style scoped></style>
