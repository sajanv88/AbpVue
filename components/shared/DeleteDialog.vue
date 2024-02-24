<script setup lang="ts">
import { useDeleteDialog, useRoles, useTenants, useUsers } from "~/store/state";
import { storeToRefs } from "pinia";
import Dialog from "~/components/shared/Dialog.vue";
import Alert from "~/components/shared/Alert.vue";
import Icon from "~/components/shared/Icon.vue";
import type { AbpEndpoint } from "~/types/abpEndpoint";
interface IDeleteDialogProps {
  type: "tenants" | "roles" | "users";
}
const props = defineProps<IDeleteDialogProps>();
const deleteStore = useDeleteDialog();
const tenantStore = useTenants();
const roleStore = useRoles();
const userStore = useUsers();
const { message, isOpen, isLoading, error } = storeToRefs(deleteStore);

const typeMapper: Record<IDeleteDialogProps["type"], AbpEndpoint> = {
  tenants: `/multi-tenancy/tenants`,
  roles: `/identity/roles`,
  users: "/identity/users",
};
const storeFetchMapper: Record<
  IDeleteDialogProps["type"],
  () => Promise<void>
> = {
  tenants: tenantStore.fetch,
  roles: roleStore.fetch,
  users: userStore.fetch,
};

const deleteAction = async () => {
  const url = typeMapper[props.type];
  const success = await deleteStore.deleteRecord(url);
  if (success) {
    deleteStore.$reset();
    await storeFetchMapper[props.type]();
  }
};
const onClose = () => {
  deleteStore.$reset();
};
</script>

<template>
  <Dialog :id="type" :open="isOpen" title="Are you sure?" @close="onClose">
    <Alert type="error" :message="error.message" v-if="error" />
    <div class="p-4 md:p-5">
      <div class="flex flex-col justify-center items-center space-y-4">
        <Icon
          icon="info-circle"
          :w="48"
          :h="48"
          classname="text-red-700 dark:text-white"
        />
        <p class="text-lg font-medium text-gray-900 dark:text-white mb-10">
          {{ message }}
        </p>
      </div>
      <div class="flex justify-end mt-10 space-x-3">
        <span v-if="isLoading" class="dark:text-white text-gray-700"
          >Deleting a record...</span
        >
        <button
          v-if="!isLoading"
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          @click="onClose"
        >
          Cancel
        </button>
        <button
          v-if="!isLoading"
          type="button"
          class="inline-flex items-center px-4 py-2 font-medium text-gray-900 focus:outline-none focus:border-blue-500 bg-white border border-red-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700"
          @click="deleteAction"
        >
          Delete
        </button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
