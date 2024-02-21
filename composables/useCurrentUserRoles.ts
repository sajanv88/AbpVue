import { getAbpServiceProxy, useToast } from "~/store/state";
import type { Volo_Abp_Identity_IdentityRoleDto } from "~/services/proxy/src";

export interface ICurrentUserRoles {
  items: Volo_Abp_Identity_IdentityRoleDto[];
}
export const useCurrentUserRoles = async (userId: string) => {
  if (!userId) return;
  const url = `${getAbpServiceProxy("/identity/users")}/${userId}/roles`;
  const data = await $fetch<ICurrentUserRoles>(url).catch((error) => {
    if (error) {
      const toastStore = useToast();
      toastStore.show({
        message: `Error fetching roles for user ${userId}: ${error.statusMessage}`,
        type: "error",
        dismissible: true,
      });
      console.error(
        `Error fetching roles for user ${userId}: ${error.statusMessage}`,
      );
    }
  });
  return data;
};
