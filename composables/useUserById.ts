import { getAbpServiceProxy, useToast } from "~/store/state";
import type { Volo_Abp_Identity_IdentityUserDto } from "~/services/proxy/src";

export const useUserById = async (userId: string) => {
  if (!userId) return;
  const url = `${getAbpServiceProxy("/identity/users")}/${userId}`;
  const data = await $fetch<Volo_Abp_Identity_IdentityUserDto>(url).catch(
    (error) => {
      if (error) {
        const toastStore = useToast();
        toastStore.show({
          message: `Error fetching user ${userId}: ${error.statusMessage}`,
          type: "error",
          dismissible: true,
        });
        console.error(`Error fetching user ${userId}: ${error.statusMessage}`);
      }
    },
  );
  return data;
};
