<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Search from "~/components/shared/Search.vue";
import {
  useAbpConfiguration,
  useRoles,
  useTenants,
  useUsers,
} from "~/store/state";
import type { GrantedPolicyType } from "~/types/grantedPolicies";
import CreateTenant from "~/components/admin/tenant/CreateTenant.vue";
import CreateRole from "~/components/admin/roles/CreateRole.vue";
import type { FetchQueryParamsType } from "~/types/fetchParams";
import CreateUser from "~/components/admin/users/CreateUser.vue";
import { Card, CardContent, CardHeader } from "~/abp/ui/card";

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
const userStore = useUsers();

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
const showCreateUserDialog = ref(false);

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
    fetch: async (params?: FetchQueryParamsType) => {
      await userStore.fetch(params);
    },
    showCreateDialog: () => {
      showCreateUserDialog.value = true;
    },
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
      <CreateUser
        v-if="showCreateUserDialog"
        :open="showCreateUserDialog"
        @dialog-close="showCreateUserDialog = false"
      />
    </ClientOnly>
  </Teleport>
  <Card class="mb-5">
    <CardHeader>
      <div class="flex items-center">
        <h1 class="text-4xl font-extrabold capitalize flex-1">
          {{ props.slug }}
        </h1>
        <Button v-if="canCreate" @click="onCreateAction">
          <Icon icon="plus" />
          {{ props.newBtnName }}
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <Search
        @on-search="onSearchEvent"
        :placeholder="props.searchPlaceholder"
        :type="props.searchType"
      />
    </CardContent>
  </Card>
</template>

<style scoped></style>
