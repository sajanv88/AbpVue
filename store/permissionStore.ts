import { defineStore } from "pinia";
import type {
  Volo_Abp_PermissionManagement_GetPermissionListResultDto,
  Volo_Abp_PermissionManagement_PermissionGroupDto,
  Volo_Abp_PermissionManagement_UpdatePermissionsDto,
} from "~/services/proxy/src";
import { getAbpServiceProxy, useToast } from "~/store/state";
import type { PermissionProvider } from "~/types/permissionProvider";

type SelectedGroupType = {
  name: string;
  isSelectedAll: boolean;
  group: Volo_Abp_PermissionManagement_PermissionGroupDto | null;
};
export interface PermissionState {
  list: Volo_Abp_PermissionManagement_GetPermissionListResultDto;
  error: { statusCode: number; message: string } | null;
  hasAllPermissionsGranted: boolean;
  disabled: boolean;
  selectedTab: Map<string, SelectedGroupType>;
  provider: {
    key: string;
    name: string;
  };
  selectedUserId: string;
}
export const usePermissionStore = defineStore("permissionStore", {
  state: (): PermissionState => ({
    list: {
      entityDisplayName: "",
      groups: [],
    },
    hasAllPermissionsGranted: false,
    disabled: false,
    error: null,
    selectedTab: new Map<string, SelectedGroupType>(),
    provider: {
      key: "",
      name: "",
    },
    selectedUserId: "",
  }),
  actions: {
    setSelectedUserId(id: string) {
      this.selectedUserId = id;
    },
    async fetch(name: PermissionProvider, key: string) {
      const url = getAbpServiceProxy("/permission-management/permissions");
      this.provider.key = key;
      this.provider.name = name;
      const data = await $fetch<PermissionState["list"]>(url, {
        query: {
          providerName: name,
          providerKey: key,
        },
      }).catch((error) => {
        if (error) {
          this.error = {
            statusCode: error.statusCode ?? 500,
            message: error.statusMessage ?? "Unknown error",
          };
          throw error;
        }
      });

      if (data) {
        this.list = data;
        this.hasAllPermissionsGranted =
          data.groups?.filter((group) => {
            return group.permissions?.every(
              (permission) => permission.isGranted,
            );
          }).length === data.groups?.length;
        const defaultGroup = data
          .groups?.[0] as Volo_Abp_PermissionManagement_PermissionGroupDto;
        if (!defaultGroup?.displayName)
          throw new Error("Permissions entity not found");
        this.selectedTab.set(defaultGroup.displayName, {
          name: defaultGroup.displayName,
          isSelectedAll: !!defaultGroup?.permissions?.every((p) => p.isGranted),
          group: defaultGroup,
        });
      }
    },
    trackAllPermissions() {
      this.hasAllPermissionsGranted =
        this.list.groups?.filter((group) => {
          return group.permissions?.every((permission) => permission.isGranted);
        }).length === this.list.groups?.length;
    },
    trackSelectedSubPermissions(
      selectedGroupName: string,
      selectedPermissionName: string,
      checked: boolean,
    ) {
      const selectedGroup = this.selectedTab.get(selectedGroupName);
      if (!selectedGroup) throw new Error("Group not found");
      const selectedPermission = selectedGroup.group?.permissions?.find(
        (p) => p.name === selectedPermissionName,
      );
      if (!selectedPermission) throw new Error("Permission not found");
      if (selectedPermission.parentName) {
        selectedPermission.isGranted = checked;
        const parent = selectedGroup.group?.permissions?.find(
          (p) => p.name === selectedPermission.parentName,
        );
        if (!parent) throw new Error("Parent permission not found");

        const children = selectedGroup.group?.permissions?.filter(
          (p) => p.parentName === parent.name,
        );
        const isChildPermissionsGranted = children?.every((c) => c.isGranted);
        parent.isGranted = !!isChildPermissionsGranted;
      }

      selectedGroup.isSelectedAll = !!selectedGroup.group?.permissions?.every(
        (permission) => permission.isGranted,
      );
      this.selectedTab.delete(selectedGroupName);

      this.selectedTab.set(selectedGroupName, selectedGroup);
    },
    grantAllPermissions(check: boolean) {
      this.list.groups?.forEach((group) => {
        group.permissions?.forEach((permission) => {
          permission.isGranted = check;
        });
        this.selectedTab.set(group.displayName!, {
          name: group.displayName!,
          isSelectedAll: check,
          group,
        });
      });
      this.hasAllPermissionsGranted = check;
    },
    updateSelectedTab(name: string) {
      const group = this.list.groups?.find((g) => g.displayName === name);
      if (!group) throw new Error("Group not found");
      this.selectedTab.set(name, {
        name,
        isSelectedAll: !!group.permissions?.every((p) => p.isGranted),
        group,
      });
    },
    grantSelectedPermissions(name: string, check: boolean = false) {
      const select = this.selectedTab.get(name);
      if (!select) throw new Error("Group not found");

      select?.group?.permissions?.forEach((permission) => {
        permission.isGranted = check;
      });
      select.isSelectedAll = !!select?.group?.permissions?.every(
        (p) => p.isGranted,
      );
      this.trackAllPermissions();
    },
    async savePermissions() {
      const url = getAbpServiceProxy("/permission-management/permissions");
      const payload: Volo_Abp_PermissionManagement_UpdatePermissionsDto = {
        permissions: this.list.groups?.flatMap((group) => {
          return group.permissions!.map((permission) => {
            return {
              name: permission.name,
              isGranted: permission.isGranted,
            };
          });
        }),
      };
      await $fetch(url, {
        method: "PUT",
        query: {
          providerName: this.provider.name,
          providerKey: this.provider.key,
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        if (error) {
          this.error = {
            statusCode: error.statusCode,
            message: error.statusMessage,
          };
          throw error;
        }
      });
      const toastStore = useToast();
      toastStore.show({
        message: "Permissions updated",
        type: "success",
        dismissible: true,
        autoClose: true,
      });
      this.$reset();
    },
  },
});
