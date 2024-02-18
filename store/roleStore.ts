import type {
  Volo_Abp_Identity_IdentityRoleCreateDto,
  Volo_Abp_Identity_IdentityRoleDto,
} from "~/services/proxy/src";
import { getAbpServiceProxy, useToast } from "~/store/state";
import type { FetchQueryParamsType } from "~/types/fetchParams";

type RoleState = {
  roles: Volo_Abp_Identity_IdentityRoleDto[];
  error: { status: number; message: string } | null;
  isLoading: boolean;
  totalCount: number;
  createRole: {
    error: { status: number; message: string } | null;
    status: boolean;
  };
  selectedRole: {
    isLoaded: boolean;
    data: Volo_Abp_Identity_IdentityRoleDto | null;
    error: { status: number; message: string } | null;
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
    totalCount: 0,
    createRole: {
      error: null,
      status: false,
    },
    selectedRole: {
      isLoaded: false,
      data: null,
      error: null,
    },
    updateRole: {
      error: null,
      status: false,
    },
  }),
  actions: {
    async fetch(params?: FetchQueryParamsType) {
      this.isLoading = true;
      const url = getAbpServiceProxy("/identity/roles");
      const { data, error } = await useFetch<
        {
          totalCount: number;
          items: Volo_Abp_Identity_IdentityRoleDto[];
        },
        { statusCode: number; statusMessage: string }
      >(url, {
        ...(params && { query: params }),
      });
      this.isLoading = false;
      if (error.value) {
        this.error = {
          status: error.value.statusCode,
          message: error.value.statusMessage,
        };
        return;
      }
      if (data.value) {
        this.roles = data.value.items;
        this.totalCount = data.value.totalCount;
      }
    },
    async createNewRole(payload: Volo_Abp_Identity_IdentityRoleCreateDto) {
      this.createRole.status = true;
      const url = getAbpServiceProxy("/identity/roles");
      await $fetch(url, {
        method: "POST",
        body: payload,
      }).catch((error) => {
        if (error) {
          this.createRole.error = {
            status: error.statusCode,
            message: error.statusMessage,
          };
          throw error;
        }
      });
      this.createRole.status = false;
      this.fetch();
      const toast = useToast();
      toast.show({
        show: true,
        message: "Role Created successfully",
        dismissible: true,
        type: "success",
        autoClose: true,
      });
      return true;
    },
  },
});
