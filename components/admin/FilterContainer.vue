<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Search from "~/components/shared/Search.vue";
import { useAbpConfiguration, useTenants } from "~/store/state";
import type { GrantedPolicyType } from "~/types/grantedPolicies";
import CreateTenant from "~/components/admin/tenant/CreateTenant.vue";

interface IFilterContainerProps {
  slug: string;
  newBtnName: string;
  searchType: "tenants" | "roles" | "users";
  searchPlaceholder: string;
}
const props = defineProps<IFilterContainerProps>();
const abpConfigStore = useAbpConfiguration();
const tenantStore = useTenants();

const searchTypeMapper: Record<
  IFilterContainerProps["searchType"],
  GrantedPolicyType
> = {
  tenants: "isAbpTenantManagementTenantsCreate",
  roles: "isAbpIdentityRolesCreate",
  users: "isAbpIdentityUsersCreate",
};

const policy = searchTypeMapper[props.searchType] as GrantedPolicyType;
const canCreate = abpConfigStore?.grantedPolicies?.get(policy);

const onSearchEvent = async (value: string) => {
  if (props.searchType == "tenants") {
    await tenantStore.fetch({ Filter: value });
  }
};

const showCreateTenantDialog = ref(false);

const onCreateAction = () => {
  if (props.searchType == "tenants") {
    showCreateTenantDialog.value = true;
  }
};
</script>

<template>
  <CreateTenant
    v-if="showCreateTenantDialog"
    :open="showCreateTenantDialog"
    @dialog-close="showCreateTenantDialog = false"
  />
  <header
    class="relative mb-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center mb-10">
      <h1 class="text-4xl font-extrabold dark:text-white capitalize flex-1">
        {{ props.slug }}
      </h1>
      <button
        v-if="canCreate"
        @click="onCreateAction"
        class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
