<script setup lang="ts">
import FilterContainer from "~/components/admin/FilterContainer.vue";
import { useAbpConfiguration, useRoles } from "~/store/state";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import Table from "~/components/shared/Table.vue";
import { v4 } from "uuid";
import Pagination from "~/components/shared/Pagination.vue";
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
const {
  roles,
  totalCount: totalRolesCount,
  isLoading: rolesFetching,
  error: rolesError,
} = storeToRefs(roleStore);
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
    const { canDeleteRole, canUpdateRole, canManageRolePermissions } =
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
    data: [],
    totalRecords: 0,
    isLoading: false,
    error: null,
    headers: config.value.headers,
    columns: config.value.columns,
    actionCtaBtnProps: config.value.actionCtaBtnProps,
  };
});

const onTableActionEvent = () => {
  console.log("onTableActionEvent");
};

const onPageChangeEvent = async (page: number) => {
  currentPage.value = page;
  if (paramSlug === "roles") {
    return await paginate();
  }
};
const totalPages = Math.ceil(records.value.totalRecords / maxRecord.value);
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
    </main>
  </section>
</template>

<style scoped></style>
