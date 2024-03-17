<script setup lang="ts">
import FilterContainer from "~/components/admin/FilterContainer.vue";
import {
  useAbpConfiguration,
  useDeleteDialog,
  usePermissionStore,
  useRoles,
  useUsers,
} from "~/store/state";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { v4 } from "uuid";
import Pagination from "~/components/shared/Pagination.vue";
import DeleteDialog from "~/components/shared/DeleteDialog.vue";
import CreateRole from "~/components/admin/roles/CreateRole.vue";

import { PermissionProvider } from "~/types/permissionProvider";
import ManagePermissions from "~/components/admin/permissions/ManagePermissions.vue";
import Alert from "~/components/shared/Alert.vue";
import CreateUser from "~/components/admin/users/CreateUser.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import TableDropdown, {
  type ActionEventParams,
} from "~/components/shared/tables/TableDropdown.vue";
import Table from "~/components/shared/tables/Table.vue";
import TableTag from "~/components/shared/tables/TableTag.vue";

const saasSlugs = ["roles", "users"] as const;
type Slug = (typeof saasSlugs)[number];

type RoleColumn = {
  name: string;
  id: string;
  tags?: Array<{ id: string; name: string }>;
};

type UserColumn = {
  name: string;
  id: string;
  email: string;
  phoneNumber: string;
};

type TableConfig = {
  columns: Array<RoleColumn | UserColumn>;
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
const deleteDialogStore = useDeleteDialog();
const permissionStore = usePermissionStore();
const userStore = useUsers();
const abpConfig = useAbpConfiguration();
const {
  roles,
  totalCount: totalRolesCount,
  isLoading: rolesFetching,
  error: rolesError,
} = storeToRefs(roleStore);

const {
  users: userList,
  totalCount: totalUsersCount,
  isLoading: usersFetching,
  error: usersError,
} = storeToRefs(userStore);
const { isOpen } = storeToRefs(deleteDialogStore);

// Pagination for roles/users list
const paginate = async (sortOrder: "asc" | "desc" = "asc") => {
  if (paramSlug === "roles") {
    await roleStore.fetch({
      MaxResultCount: maxRecord.value,
      SkipCount: currentPage.value,
      Sorting: `name ${sortOrder}`,
    });
  } else if (paramSlug == "users") {
    await userStore.fetch({
      MaxResultCount: maxRecord.value,
      SkipCount: currentPage.value,
    });
  }
};

const rolePolicies = useRolePolicy();
const userPolicies = useUserPolicy();

const tableConfigSlugMapper: Record<Slug, () => TableConfig> = {
  roles: () => {
    const columns: TableConfig["columns"] = [];
    const { canUpdateRole, canManageRolePermissions, canDeleteRole } =
      rolePolicies;
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
      actionCtaBtnProps.options.push({ name: "Permissions" });
    }
    return { actionCtaBtnProps, columns };
  },
  users: () => {
    const columns: TableConfig["columns"] = [];
    const actionCtaBtnProps: TableConfig["actionCtaBtnProps"] = {
      name: "Actions",
      options: [],
    };
    const { canUpdateUser, canDeleteUser, canManageUserPermission } =
      userPolicies;

    if (canDeleteUser) {
      actionCtaBtnProps.options.push({ name: "Delete" });
    }
    if (canUpdateUser) {
      actionCtaBtnProps.options.push({ name: "Edit" });
    }
    if (canManageUserPermission) {
      actionCtaBtnProps.options.push({ name: "Permissions" });
    }

    return { actionCtaBtnProps, columns };
  },
};

const config = ref(tableConfigSlugMapper[paramSlug]());
const cols = () => {
  if (paramSlug === "roles") {
    const roleCols: ColumnDef<RoleColumn>[] = [
      {
        id: "actions",
        header: () => h("span", "Actions"),
        cell: (props) => {
          const role = props.row.original;
          return h(
            "span",
            { class: "relative" },
            h(TableDropdown, {
              id: role.id,
              name: role.name,
              items: config.value.actionCtaBtnProps.options.filter((p) => {
                if (role.name === "admin" && abpConfig.isAdmin) {
                  return p.name !== "Delete";
                }
                return p;
              }),
              onAction: onTableActionEvent,
            }),
          );
        },
      },
      {
        accessorKey: "name",
        enableSorting: true,
        header: () => h("span", "Role Name"),
        cell: (props) => {
          return h(
            TableTag,
            {
              name: props.row.original.name,
              tags: props.row.original.tags || [],
            },
            {
              default: () => props.row.original.name,
            },
          );
        },
      },
    ];
    return roleCols;
  } else if (paramSlug === "users") {
    const userCols: ColumnDef<UserColumn>[] = [
      {
        id: "actions",
        header: () => h("span", "Actions"),
        cell: (props) => {
          const role = props.row.original;
          return h(
            "span",
            { class: "relative" },
            h(TableDropdown, {
              id: role.id,
              name: role.name,
              items: config.value.actionCtaBtnProps.options.filter((p) => {
                if (role.name === "admin" && abpConfig.isAdmin) {
                  return p.name !== "Delete";
                }
                return p;
              }),
              onAction: onTableActionEvent,
            }),
          );
        },
      },
      {
        accessorKey: "userName",
        enableSorting: true,
        header: () => h("span", "User Name"),
        cell: (props) => {
          const user = props.row.original;
          return h("span", user.name);
        },
      },
      {
        accessorKey: "email",
        enableSorting: true,
        header: () => h("span", "Email Address"),
        cell: (props) => {
          const user = props.row.original;
          return h("span", user.email);
        },
      },
      {
        accessorKey: "phoneNumber",
        enableSorting: true,
        header: () => h("span", "Phone Number"),
        cell: (props) => {
          const user = props.row.original;
          return h("span", user.phoneNumber);
        },
      },
    ];
    return userCols;
  }
};
const refreshRoles = (params: typeof roles) => {
  if (paramSlug == "roles" && params.value) {
    config.value.columns = [];
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

const refreshUsers = (params: typeof userList) => {
  if (paramSlug == "users" && params.value) {
    config.value.columns = [];
    for (const param of params.value) {
      config.value.columns.push({
        name: param.name!,
        id: param.id!,
        phoneNumber: param.phoneNumber!,
        email: param.email!,
      });
    }
  }
};

watch(roles, () => {
  const r: typeof roles = roles;
  refreshRoles(r);
});

watch(userList, () => {
  const u: typeof userList = userList;
  refreshUsers(u);
});

watch(totalRolesCount, () => {
  if (paramSlug === "roles") {
    enablePagination.value =
      totalRolesCount.value > config.value.columns.length;
  } else if (paramSlug === "users") {
    enablePagination.value =
      totalUsersCount.value > config.value.columns.length;
  }
});

if (paramSlug === "roles") {
  refreshRoles(roles);
} else if (paramSlug === "users") {
  refreshUsers(userList);
}

await paginate();

const onTableActionEvent = async ({
  data: { invokedBy, value },
}: {
  data: ActionEventParams;
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
    } else if (paramSlug === "users") {
      userStore.setSelectedUserId(value.id);
    }
  }

  if (invokedBy === "Permissions") {
    // Fetch permissions for the selected role or user
    if (paramSlug === "roles" || paramSlug === "users") {
      let providerKey = "";
      let providerName: PermissionProvider = PermissionProvider.R;
      if (paramSlug === "roles") {
        providerKey = value.name;
        providerName = PermissionProvider.R;
      } else if (paramSlug === "users") {
        permissionStore.setSelectedUserId(value.id);
        providerKey = value.id;
        providerName = PermissionProvider.U;
      }
      return await permissionStore.fetch(providerName, providerKey);
    }
  }
};

const onPageChangeEvent = async (page: number) => {
  currentPage.value = page;
  return await paginate();
};

const onSortEvent = async ({
  name,
  order,
}: {
  name: string;
  order: "asc" | "desc";
}) => {
  console.log(name, "name");
  if (paramSlug === "roles") {
    await paginate(order);
  } else if (paramSlug == "users") {
    await userStore.fetch({
      MaxResultCount: maxRecord.value,
      SkipCount: currentPage.value,
      Sorting: `${name} ${order}`,
    });
  }
};

const records = computed(() => {
  if (paramSlug === "roles") {
    return {
      title: "Role",
      data: roles.value,
      totalRecords: totalRolesCount.value,
      isLoading: rolesFetching.value,
      error: rolesError.value || permissionStore.error,
      columns: config.value.columns,
      actionCtaBtnProps: config.value.actionCtaBtnProps,
    };
  } else if (paramSlug === "users") {
    return {
      title: "User",
      data: userList.value,
      totalRecords: totalUsersCount.value,
      isLoading: usersFetching.value,
      error: usersError.value || permissionStore.error,
      columns: config.value.columns,
      actionCtaBtnProps: config.value.actionCtaBtnProps,
    };
  }
  return null;
});

const totalPages = computed(() => {
  if (records.value) {
    return Math.ceil(records.value.totalRecords / maxRecord.value);
  }
  return 0;
});
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
      <ManagePermissions
        v-if="!!permissionStore.list.entityDisplayName"
        :open="!!permissionStore.list.entityDisplayName"
        :type="paramSlug"
      />
      <CreateUser
        v-if="!!userStore.selectedUserId"
        :open="!!userStore.selectedUserId"
        :edit="true"
      />
    </Teleport>
    <FilterContainer
      :slug="slug"
      :key="slug"
      :newBtnName="`New ${records?.title}`"
      :searchType="slug"
      searchPlaceholder="Search..."
    />
    <main>
      <Alert
        type="destructive"
        v-if="records?.error"
        :message="records?.error?.message"
        :dismissible="true"
      />
      <Table
        :data="records?.columns"
        :columns="cols()"
        @on-sorting-change="onSortEvent"
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
