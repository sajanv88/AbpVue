<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Search from "~/components/shared/Search.vue";
import { useAbpConfiguration, useRoles, useTenants } from "~/store/state";
import type { GrantedPolicyType } from "~/types/grantedPolicies";
import CreateTenant from "~/components/admin/tenant/CreateTenant.vue";
import CreateRole from "~/components/admin/roles/CreateRole.vue";
import type { FetchQueryParamsType } from "~/types/fetchParams";

interface IFilterContainerProps {
  slug: string;
  newBtnName: string;
  searchType: "tenants" | "roles" | "users";
  searchPlaceholder: string;
}
const props = defineProps<IFilterContainerProps>();
const abpConfigStore = useAbpConfiguration();
const tenantStore = useTenants();
const roleStore = useRoles();

const searchTypeMapper: Record<
  IFilterContainerProps["searchType"],
  GrantedPolicyType
> = {
  tenants: "isAbpTenantManagementTenantsCreate",
  roles: "isAbpIdentityRolesCreate",
  users: "isAbpIdentityUsersCreate",
};
const showCreateTenantDialog = ref(false);
const showCreateRoleDialog = ref(false);

const policy = searchTypeMapper[props.searchType] as GrantedPolicyType;
const canCreate = abpConfigStore?.grantedPolicies?.get(policy);

type TypeMapper = {
  fetch: (params?: FetchQueryParamsType) => Promise<void>;
  showCreateDialog: () => void;
};

const typeMapper: Record<IFilterContainerProps["searchType"], TypeMapper> = {
  tenants: {
    fetch: async (params?: FetchQueryParamsType) =>
      await tenantStore.fetch(params),
    showCreateDialog: () => {
      showCreateTenantDialog.value = true;
    },
  },
  roles: {
    fetch: async (params?: FetchQueryParamsType) =>
      await roleStore.fetch(params),
    showCreateDialog: () => {
      showCreateRoleDialog.value = true;
    },
  },
  users: {
    fetch: async (params?: FetchQueryParamsType) => console.log("fetch users"),
    showCreateDialog: () => console.log("trigger user dialog"),
  },
};

const onSearchEvent = async (value: string) => {
  await typeMapper[props.searchType].fetch({ Filter: value });
};

const onCreateAction = () => {
  typeMapper[props.searchType].showCreateDialog();
};
</script>

<template>
  <Teleport to="body">
    <ClientOnly>
      <CreateTenant
        v-if="showCreateTenantDialog"
        :open="showCreateTenantDialog"
        @dialog-close="showCreateTenantDialog = false"
      />
      <CreateRole
        v-if="showCreateRoleDialog"
        :open="showCreateRoleDialog"
        @dialog-close="showCreateRoleDialog = false"
      />
    </ClientOnly>
  </Teleport>
  <header
    class="relative mb-5 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center mb-10">
      <h1 class="text-4xl font-extrabold dark:text-white capitalize flex-1">
        {{ props.slug }}
      </h1>
      <button
        v-if="canCreate"
        @click="onCreateAction"
        class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <Icon icon="plus" />
        <span>{{ props.newBtnName }}</span>
      </button>
    </div>
    <Search
      @on-search="onSearchEvent"
      :placeholder="props.searchPlaceholder"
      :type="props.searchType"
    />
  </header>
</template>

<style scoped></style>
