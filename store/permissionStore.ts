import { defineStore } from "pinia";
import type { Volo_Abp_PermissionManagement_GetPermissionListResultDto } from "~/services/proxy/src";
import { getAbpServiceProxy } from "~/store/state";
import type { PermissionProvider } from "~/types/permissionProvider";

export interface PermissionState {
  list: Volo_Abp_PermissionManagement_GetPermissionListResultDto;
  error: { statusCode: number; message: string } | null;
}
export const usePermissionStore = defineStore("permissionStore", {
  state: (): PermissionState => ({
    list: {
      entityDisplayName: "",
      groups: [],
    },
    error: null,
  }),
  actions: {
    async fetch(name: PermissionProvider, key: string) {
      const url = getAbpServiceProxy("/permission-management/permissions");

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
      }
    },
  },
});
