<script setup lang="ts">
import FilterContainer from "~/components/admin/FilterContainer.vue";
import { useAbpConfiguration, useDeleteDialog, useRoles } from "~/store/state";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import Table, { type ActionCtaDataType } from "~/components/shared/Table.vue";
import { v4 } from "uuid";
import Pagination from "~/components/shared/Pagination.vue";
import TenantFeatureManagement from "~/components/admin/tenant/TenantFeatureManagement.vue";
import CreateTenant from "~/components/admin/tenant/CreateTenant.vue";
import DeleteDialog from "~/components/shared/DeleteDialog.vue";
import CreateRole from "~/components/admin/roles/CreateRole.vue";
import Spinner from "~/components/shared/Spinner.vue";
const saasSlugs = ["roles", "users"] as const;
type Slug = (typeof saasSlugs)[number];

type TableConfig = {
  headers: Array<{ name: string }>;
  columns: Array<{
    name: string;
    id: string;
    tags?: Array<{ id: string; name: string }>;
  }>;
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
const currentPage = ref(0);
const maxRecord = ref(10);
const enablePagination = ref(false);

const roleStore = useRoles();
const abpConfigStore = useAbpConfiguration();
const deleteDialogStore = useDeleteDialog();
const currentUser = abpConfigStore.config?.currentUser;

const {
  roles,
  totalCount: totalRolesCount,
  isLoading: rolesFetching,
  error: rolesError,
} = storeToRefs(roleStore);
const { isOpen } = storeToRefs(deleteDialogStore);
if (!saasSlugs.includes(paramSlug)) {
  await navigateTo("/error/notfound");
}

// Pagination for roles/users list
const paginate = async () => {
  if (paramSlug === "roles") {
    await roleStore.fetch({
      MaxResultCount: maxRecord.value,
      SkipCount: currentPage.value,
    });
  }
};

const rolePolicies = () => {
  const canDeleteRole = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesDelete",
  );
  const canUpdateRole = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesUpdate",
  );
  const canManageRolePermissions = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesManagePermissions",
  );
  return { canDeleteRole, canUpdateRole, canManageRolePermissions };
};

const tableConfigSlugMapper: Record<Slug, () => TableConfig> = {
  roles: () => {
    const headers = [{ name: "Actions" }, { name: "Role Name" }];
    const columns: TableConfig["columns"] = [];
    const { canUpdateRole, canManageRolePermissions, canDeleteRole } =
      rolePolicies();
    const actionCtaBtnProps: TableConfig["actionCtaBtnProps"] = {
      name: "Actions",
      options: [],
    };

    if (canDeleteRole) {
      actionCtaBtnProps.options.push({ name: "Delete" });
    }
    if (canUpdateRole) {
      actionCtaBtnProps.options.push({ name: "Edit" });
    }
    if (canManageRolePermissions) {
      actionCtaBtnProps.options.push({ name: "Settings" });
    }
    return { headers, actionCtaBtnProps, columns };
  },
  users: () => {
    const headers = [{ name: "Actions" }, { name: "User Name" }];
    const columns: TableConfig["columns"] = [];
    const actionCtaBtnProps: TableConfig["actionCtaBtnProps"] = {
      name: "Actions",
      options: [],
    };
    return { headers, actionCtaBtnProps, columns };
  },
};

const config = ref(tableConfigSlugMapper[paramSlug]());
const refreshRoles = (params: typeof roles) => {
  if (paramSlug == "roles" && params.value) {
    for (const param of params.value) {
      const tags = [
        {
          id: v4(),
          name: param.isDefault ? "default" : "",
        },
        {
          id: v4(),
          name: param.isPublic ? "public" : "",
        },
      ];

      config.value.columns.push({
        name: param.name!,
        id: param.id!,
        tags: tags.filter((t) => t.name),
      });
    }
  }
};

watch(roles, () => {
  config.value.columns = [];
  const r: typeof roles = roles;
  refreshRoles(r);
});

watch(totalRolesCount, () => {
  if (paramSlug === "roles") {
    enablePagination.value =
      totalRolesCount.value > config.value.columns.length;
  }
});

refreshRoles(roles);

await paginate();

const records = computed(() => {
  if (paramSlug === "roles") {
    return {
      title: "Role",
      data: roles.value,
      totalRecords: totalRolesCount.value,
      isLoading: rolesFetching.value,
      error: rolesError.value,
      headers: config.value.headers,
      columns: config.value.columns,
      actionCtaBtnProps: config.value.actionCtaBtnProps,
    };
  }
  return {
    title: "User",
    data: [],
    totalRecords: 0,
    isLoading: false,
    error: null,
    headers: config.value.headers,
    columns: config.value.columns,
    actionCtaBtnProps: config.value.actionCtaBtnProps,
  };
});

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
    if (paramSlug === "roles") {
      return await roleStore.getRoleById(value.id);
    }
  }
};
const onPageChangeEvent = async (page: number) => {
  currentPage.value = page;
  if (paramSlug === "roles") {
    return await paginate();
  }
};
const totalPages = computed(() =>
  Math.ceil(records.value.totalRecords / maxRecord.value),
);
</script>

<template>
  <section>
    <Teleport to="body">
      <DeleteDialog :type="paramSlug" v-if="isOpen" />
      <CreateRole
        v-if="roleStore.selectedRole.data"
        :open="roleStore.selectedRole.data"
        :edit="true"
      />
    </Teleport>
    <FilterContainer
      :slug="slug"
      :key="slug"
      :newBtnName="`New ${records.title}`"
      :searchType="slug"
      searchPlaceholder="Search..."
    />
    <main>
      <ClientOnly fallback-tag="span" fallback="Loading...">
        <template #fallback>
          <Spinner />
        </template>
        <Table
          :is-loading="records.isLoading"
          :headers="records.headers"
          :columns="records.columns"
          :action-cta="records.actionCtaBtnProps"
          @on-Action="onTableActionEvent"
          :is-no-data="records.data?.length === 0"
        />
        <div v-if="enablePagination" :key="enablePagination">
          <Pagination
            :total-page="totalPages"
            :current-page="currentPage"
            :key="currentPage"
            @on-next-page="onPageChangeEvent"
            @on-previous-page="onPageChangeEvent"
            @on-selected-page="onPageChangeEvent"
          />
        </div>
      </ClientOnly>
    </main>
  </section>
</template>

<style scoped></style>
