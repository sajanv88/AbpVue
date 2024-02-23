<script setup lang="ts">
import Alert from "~/components/shared/Alert.vue";
import Dialog from "~/components/shared/Dialog.vue";
import { useAbpConfiguration, usePermissionStore } from "~/store/state";
import Checkbox from "~/components/shared/Checkbox.vue";
import type {
  Volo_Abp_Identity_IdentityUserDto,
  Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
} from "~/services/proxy/src";
import { v4 } from "uuid";
import type { ICurrentUserRoles } from "~/composables/useCurrentUserRoles";
import { useUserById } from "~/composables/useUserById";

interface IManagePermissions {
  open: boolean;
  type: "roles" | "users";
}
const processing = ref(false);
const permissionStore = usePermissionStore();
const props = defineProps<IManagePermissions>();
const emit = defineEmits(["dialogClose"]);
const abpConfigStore = useAbpConfiguration();

const currentUser = abpConfigStore.config?.currentUser;

const selectedUserRoles = (await useCurrentUserRoles(
  permissionStore.selectedUserId,
)) as ICurrentUserRoles;

const selectedUserById = (await useUserById(
  permissionStore.selectedUserId,
)) as Volo_Abp_Identity_IdentityUserDto;

const onCloseDialog = () => {
  emit("dialogClose");
  permissionStore.$reset();
};

const onSubmitForm = async (e: SubmitEvent) => {
  e.preventDefault();
  processing.value = true;
  await permissionStore.savePermissions();
  processing.value = false;
};
const title = `Permissions - ${props.type === "roles" ? permissionStore.list.entityDisplayName : selectedUserById?.userName}`;

const selectedTab = computed(() => {
  return permissionStore.selectedTab;
});
const selectedTabName = ref(permissionStore.list?.groups?.[0].displayName);
const onTabChange = (groupName: string) => {
  selectedTabName.value = groupName;
  permissionStore.updateSelectedTab(groupName);
};

const groups = permissionStore.list.groups;

const onGrantAllPermission = (checked: boolean) => {
  permissionStore.grantAllPermissions(checked);
};

const onSelectAllPermissions = (checked: boolean) => {
  permissionStore.grantSelectedPermissions(selectedTabName.value!, checked);
};

const shouldDisable = computed(() => {
  if (props.type === "roles") return false;

  return (
    selectedUserRoles.items.filter((role) =>
      currentUser?.roles?.includes(role.name!),
    ).length > 0
  );
});

const selectedTagGroup = computed(() => {
  return selectedTab.value.get(selectedTabName.value!);
});

const onSubPermissionChange = (
  checked: boolean,
  permission: Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
) => {
  const g = selectedTagGroup.value?.group;
  if (!g) return;
  // Parent name is null select all child permissions
  if (!permission.parentName) {
    permissionStore.$patch((state) => {
      g.permissions?.forEach((p) => {
        if (p.parentName == permission.name || p.name == permission.name) {
          p.isGranted = checked;
        }
      });
      const selected = state.selectedTab.get(selectedTabName.value!);
      if (selected) {
        state.selectedTab.set(selectedTabName.value!, {
          ...selected,
          group: g,
        });
      }
    });
    return;
  }

  permissionStore.trackSelectedSubPermissions(
    selectedTabName.value!,
    permission.name!,
    checked,
  );
};

const checkAllPermissions = permissionStore.hasAllPermissionsGranted;
</script>

<template>
  <Dialog
    id="managePermissions"
    :title="title"
    :open="open"
    @close="onCloseDialog"
  >
    <Alert
      v-if="permissionStore.error"
      type="error"
      :message="permissionStore.error.message"
    />
    <form class="p-4 md:p-5" @submit="onSubmitForm">
      <section class="grid md:gap-8 grid-cols-12">
        <section class="mb-10 md:mb-0 col-span-12 md:col-span-5">
          <h2
            class="border-b border-gray-400 dark:border-white pb-3"
            :key="checkAllPermissions"
          >
            <Checkbox
              id="grantAll"
              name="grantAll"
              :checked="checkAllPermissions.toString()"
              label="Grant all permissions"
              :disabled="shouldDisable"
              @on-change-event="onGrantAllPermission"
            />
          </h2>
          <ul class="mt-5">
            <li v-for="group in groups" :key="group.displayName" class="py-2">
              <a
                class="block border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-3 text-center dark:border-blue-500 dark:focus:ring-blue-800"
                href="javascript:void(0)"
                @click="() => onTabChange(group.displayName!)"
                :class="
                  selectedTabName == group.displayName
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-700 dark:text-white hover:text-white dark:hover:text-white dark:hover:bg-blue-500 hover:bg-blue-800'
                "
              >
                <span class="inline-flex items-center space-x-2">
                  <span class="truncate">{{ group.displayName }}</span>
                  <span>
                    ({{ group.permissions?.filter((p) => p.isGranted).length }})
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </section>
        <section class="mb-10 md:-mb-0 col-span-12 md:col-span-7">
          <h2
            class="border-b border-gray-400 dark:border-white pb-3"
            :key="selectedTagGroup.isSelectedAll"
          >
            <Checkbox
              id="selectAll"
              name="selectAll"
              :checked="selectedTagGroup.isSelectedAll.toString()"
              label="Select all"
              :disabled="shouldDisable"
              @on-change-event="onSelectAllPermissions"
            />
          </h2>
          <ul class="mt-5">
            <li
              v-for="permission in selectedTagGroup?.group?.permissions"
              :key="permission.isGranted + v4()"
              class="py-2"
            >
              <span v-if="!!permission.parentName" class="inline-block pl-6">
                <Checkbox
                  :id="permission.name"
                  :name="permission.name"
                  :checked="permission.isGranted.toString()"
                  :disabled="shouldDisable"
                  :label="permission.displayName"
                  @on-change-event="
                    (checked) => onSubPermissionChange(checked, permission)
                  "
                />
              </span>
              <span v-else class="inline-block">
                <Checkbox
                  :label-style="'font-semibold text-lg leading-none'"
                  :id="permission.name"
                  :name="permission.name"
                  :disabled="shouldDisable"
                  :checked="permission.isGranted.toString()"
                  :label="permission.displayName"
                  @on-change-event="
                    (checked) => onSubPermissionChange(checked, permission)
                  "
                />
              </span>
            </li>
          </ul>
        </section>
      </section>
      <footer class="flex items-center justify-end space-x-2">
        <span v-if="processing" class="text-gray-700 dark:text-white"
          >Saving permissions</span
        >
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
