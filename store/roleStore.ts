import type { Volo_Abp_Identity_IdentityRoleDto } from "~/services/proxy/src";
import { getAbpServiceProxy } from "~/store/state";

type RoleState = {
  roles: Volo_Abp_Identity_IdentityRoleDto[];
  error: { status: number; message: string } | null;
  isLoading: boolean;
  createRole: {
    error: { status: number; message: string } | null;
    status: boolean;
  };
  updateRole: {
    error: { status: number; message: string } | null;
    status: boolean;
  };
};
export const useRoles = defineStore("roles", {
  state: (): RoleState => ({
    roles: [],
    error: null,
    isLoading: false,
    createRole: {
      error: null,
      status: false,
    },
    updateRole: {
      error: null,
      status: false,
    },
  }),
  actions: {
    async fetch() {
      this.isLoading = true;
      const url = getAbpServiceProxy("/identity/roles");
      const { data } = useFetch(url);
    },
  },
});
