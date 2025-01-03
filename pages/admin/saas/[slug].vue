<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import FilterContainer from "~/components/admin/FilterContainer.vue";
import { useDeleteDialog, useFeatures, useTenants } from "~/store/state";
import Table from "~/components/shared/tables/Table.vue";
import TableDropdown, {
  type ActionEventParams,
} from "~/components/shared/tables/TableDropdown.vue";

import Pagination from "~/components/shared/Pagination.vue";
import DeleteDialog from "~/components/shared/DeleteDialog.vue";
import CreateTenant from "~/components/admin/tenant/CreateTenant.vue";
import TenantFeatureManagement from "~/components/admin/tenant/TenantFeatureManagement.vue";

import { useTenantPolicy } from "~/composables/useTenantPolicy";
import Alert from "~/components/shared/Alert.vue";
import type { ColumnDef } from "@tanstack/vue-table";

// Include editions, etc..
const saasSlugs = ["tenants"] as const;
type Slug = (typeof saasSlugs)[number];
type ReturnConfig = {
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
const { tenants, totalCount } = storeToRefs(tenantStore);
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

    return { actionCtaBtnProps, columns };
  },
};

const onTableActionEvent = async ({
  data: { invokedBy, value },
}: {
  data: ActionEventParams;
}) => {
  if (paramSlug === "tenants") {
    if (invokedBy === "Edit") {
      return await tenantStore.getSelectedTenant(value.id);
    }
    if (invokedBy === "Settings") {
      return await featureStore.fetch(value.id);
    }
    if (invokedBy === "Delete") {
      return await deleteDialogStore.showDialog(
        value.id,
        `${value.name} will be deleted. Do you confirm that?`,
      );
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

const onSortEvent = async ({
  name,
  order,
}: {
  name: string;
  order: "asc" | "desc";
}) => {
  if (paramSlug === "tenants") {
    await tenantStore.fetch({
      MaxResultCount: maxRecord.value,
      SkipCount: currentPage.value,
      Sorting: `name ${order}`,
    });
  }
};
const totalPages = computed(() =>
  Math.ceil(totalCount.value / maxRecord.value),
);

const cols: ColumnDef<{ name: string; id: string }>[] = [
  {
    id: "actions",
    header: () => h("span", "Actions"),

    cell: (props) => {
      const tenant = props.row.original;
      return h(
        "span",
        { class: "relative" },
        h(TableDropdown, {
          id: tenant.id,
          name: tenant.name,
          items: config.value.actionCtaBtnProps.options,
          onAction: onTableActionEvent,
        }),
      );
    },
  },
  {
    accessorKey: "name",
    enableSorting: true,
    header: () => h("span", "Tenant Name"),
    cell: (props) => {
      return h(
        "div",
        { class: "text-left" },
        props.row.getValue<string>("name"),
      );
    },
  },
];
</script>

<template>
  <section>
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
      <Alert
        type="destructive"
        :message="tenantStore.error.message"
        v-if="tenantStore.error"
        :dismissible="true"
      />
      <Table
        :columns="cols"
        :data="config.columns"
        @on-sorting-change="onSortEvent"
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
