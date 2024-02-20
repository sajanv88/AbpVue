<script setup lang="ts">
import Alert from "~/components/shared/Alert.vue";
import Dialog from "~/components/shared/Dialog.vue";
import { usePermissionStore } from "~/store/state";
import Checkbox from "~/components/shared/Checkbox.vue";

interface IManagePermissions {
  open: boolean;
}
const processing = ref(false);
const permissionStore = usePermissionStore();
defineProps<IManagePermissions>();
const emit = defineEmits(["dialogClose"]);
const onCloseDialog = () => {
  emit("dialogClose");
  permissionStore.$reset();
};
const onSubmitForm = async (e: SubmitEvent) => {};
const title = `Permissions - ${permissionStore.list.entityDisplayName}`;
const selectedGroup = ref(permissionStore.list.groups?.[0]);
const isAllPermissionGranted = computed(() => {
  return (
    permissionStore.list.groups?.filter((group) => {
      return group.permissions?.every((permission) => {
        return permission.isGranted == true;
      });
    }).length === permissionStore.list.groups?.length
  );
});

const groups = computed(() => {
  return permissionStore.list.groups;
});

const selectedTab = ref(permissionStore.list.groups?.[0].displayName);
const onTabChange = (groupName: string) => {
  selectedTab.value = groupName;
  selectedGroup.value = permissionStore.list.groups?.find(
    (group) => group.displayName === groupName,
  );
};
const hasAllSelectedPermission = computed(() => {
  return selectedGroup.value?.permissions?.every(
    (permission) => permission.isGranted == true,
  );
});
</script>

<template>
  <Dialog
    id="managePermissions"
    :title="title"
    :open="open"
    @close="onCloseDialog"
  >
    <!--    <Alert-->
    <!--        v-if="createRole.error"-->
    <!--        type="error"-->
    <!--        :message="createRole.error.message"-->
    <!--    />-->
    <form class="p-4 md:p-5" @submit="onSubmitForm">
      <section class="grid gap-8 grid-cols-12">
        <section class="col-span-4">
          <h2 class="border-b border-gray-400 dark:border-white pb-3">
            <Checkbox
              id="grantAll"
              name="grantAll"
              :checked="isAllPermissionGranted"
              label="Grant all permissions"
            />
          </h2>
          <ul class="mt-5">
            <li
              v-for="group in groups"
              :key="group.displayNameKey"
              class="py-2"
            >
              <a
                class="block border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-3 text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800"
                href="javascript:void(0)"
                @click="() => onTabChange(group.displayName)"
                :class="
                  selectedTab == group.displayName
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-700 hover:text-white dark:hover:text-white dark:hover:bg-blue-500 hover:bg-blue-800'
                "
              >
                {{ group.displayName }}
              </a>
            </li>
          </ul>
        </section>
        <section class="col-span-8">
          <h2 class="border-b border-gray-400 dark:border-white pb-3">
            <Checkbox
              id="selectAll"
              name="selectAll"
              :checked="hasAllSelectedPermission"
              label="Select all"
            />
          </h2>
          <ul class="mt-5">
            <li
              v-for="permission in selectedGroup.permissions"
              :key="permission.name"
              class="py-2"
            >
              <span v-if="!!permission.parentName" class="inline-block pl-6">
                <Checkbox
                  :id="permission.name"
                  :name="permission.name"
                  :checked="permission.isGranted"
                  :label="permission.displayName"
                />
              </span>
              <span v-else class="inline-block">
                <Checkbox
                  :label-style="'font-semibold text-lg leading-none'"
                  :id="permission.name"
                  :name="permission.name"
                  :checked="permission.isGranted"
                  :label="permission.displayName"
                />
              </span>
            </li>
          </ul>
        </section>
      </section>
      <footer class="flex items-center justify-end space-x-2">
        <!--        <span v-if="createRole.status" class="text-gray-700 dark:text-white"-->
        <!--        >Creating a New Role...</span-->
        <!--        >-->
        <!--        <span v-if="updateRole.status" class="text-gray-700 dark:text-white"-->
        <!--        >Updating Role...</span-->
        <!--        >-->
        <button
          v-if="!processing"
          type="button"
          @click="onCloseDialog"
          class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Cancel
        </button>
        <button
          v-if="!processing"
          type="submit"
          class="inline-flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Save
        </button>
      </footer>
    </form>
  </Dialog>
</template>

<style scoped></style>
