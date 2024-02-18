import type {
  Volo_Abp_Identity_IdentityRoleCreateDto,
  Volo_Abp_Identity_IdentityRoleDto,
  Volo_Abp_Identity_IdentityRoleUpdateDto,
} from "~/services/proxy/src";
import {
  getAbpServiceProxy,
  useToast,
  useAbpConfiguration,
} from "~/store/state";
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
      const abpConfigStore = useAbpConfiguration();
      const isAdmin =
        abpConfigStore.config?.currentUser?.roles?.includes("admin");
      this.isLoading = true;
      const url =
        isAdmin && !params
          ? getAbpServiceProxy("/identity/roles/all")
          : getAbpServiceProxy("/identity/roles");
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
          this.createRole.status = false;
          throw error;
        }
      });
      this.createRole.status = false;
      this.resetError();
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
    async updateExistingRole(payload: Volo_Abp_Identity_IdentityRoleUpdateDto) {
      this.updateRole.status = true;
      const roleId = this.selectedRole.data?.id;
      const url = `${getAbpServiceProxy("/identity/roles")}/${roleId}`;
      await $fetch(url, {
        method: "PUT",
        body: payload,
      }).catch((error) => {
        if (error) {
          this.updateRole.error = {
            status: error.statusCode,
            message: error.statusMessage,
          };
          this.updateRole.status = false;
          throw error;
        }
      });
      this.updateRole.status = false;
      const toast = useToast();
      toast.show({
        show: true,
        message: "Role Updated successfully",
        dismissible: true,
        type: "success",
        autoClose: true,
      });
      this.resetError();
      this.resetSelectedRole();
      await this.fetch();
      return true;
    },
    async getRoleById(id: string) {
      this.selectedRole.isLoaded = true;
      const url = `${getAbpServiceProxy(`/identity/roles`)}/${id}`;
      const data = await $fetch<Volo_Abp_Identity_IdentityRoleDto>(url).catch(
        (error) => {
          if (error) {
            this.selectedRole.error = {
              status: error.statusCode,
              message: error.statusMessage,
            };
            this.selectedRole.isLoaded = false;
            throw error;
          }
        },
      );
      this.selectedRole.isLoaded = false;
      this.selectedRole.data = {
        ...data,
      };
    },
    resetSelectedRole() {
      this.selectedRole = {
        isLoaded: false,
        data: null,
        error: null,
      };
    },
    resetError() {
      this.error = null;
      this.createRole.error = null;
      this.updateRole.error = null;
      this.selectedRole.error = null;
      this.createRole.status = false;
      this.updateRole.status = false;
    },
  },
});
