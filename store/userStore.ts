import { defineStore } from "pinia";
import type {
  Volo_Abp_Identity_IdentityUserCreateDto,
  Volo_Abp_Identity_IdentityUserDto,
  Volo_Abp_Identity_IdentityUserUpdateDto,
} from "~/services/proxy/src";
import { getAbpServiceProxy, useToast } from "~/store/state";
import type { FetchQueryParamsType } from "~/types/fetchParams";

interface UserState {
  users: Volo_Abp_Identity_IdentityUserDto[];
  error: { status: number; message: string } | null;
  isLoading: boolean;
  totalCount: number;
  createUser: {
    status: boolean;
    error: { status: number; message: string } | null;
  };
  updateUser: {
    status: boolean;
    error: { status: number; message: string } | null;
  };
  selectedUserId: string;
}

export const useUsers = defineStore("users", {
  state: (): UserState => ({
    users: [],
    error: null,
    isLoading: false,
    totalCount: 0,
    createUser: {
      status: false,
      error: null,
    },
    updateUser: {
      status: false,
      error: null,
    },
    selectedUserId: "",
  }),
  actions: {
    setSelectedUserId(id: string) {
      this.selectedUserId = id;
    },
    async fetch(params?: FetchQueryParamsType) {
      this.isLoading = true;
      const url = getAbpServiceProxy("/identity/users");
      const { data, error } = await useFetch<{
        totalCount: number;
        items: Volo_Abp_Identity_IdentityUserDto[];
      }>(url, {
        method: "GET",
        ...(params && { query: params }),
      });
      if (error.value) {
        this.error = {
          status: error.value.statusCode ?? 500,
          message: error.value.message,
        };
        this.isLoading = false;
        throw error.value;
      }
      if (data.value) {
        this.users = data.value.items;
        this.totalCount = data.value.totalCount;
        this.isLoading = false;
      }
    },
    async createNewUser(payload: Volo_Abp_Identity_IdentityUserCreateDto) {
      const url = getAbpServiceProxy("/identity/users");
      await $fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).catch((error) => {
        this.createUser.error = {
          status: error.statusCode ?? 500,
          message: error.message,
        };
        this.createUser.status = false;
        throw error;
      });
      await this.fetch();
      const toastStore = useToast();
      toastStore.show({
        message: "User created successfully",
        type: "success",
        dismissible: true,
        autoClose: true,
      });

      return true;
    },
    async updateExistingUser(payload: Volo_Abp_Identity_IdentityUserUpdateDto) {
      const url = `${getAbpServiceProxy(`/identity/users`)}/${this.selectedUserId}`;
      await $fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
      }).catch((error) => {
        this.updateUser.error = {
          status: error.statusCode ?? 500,
          message: error.message,
        };
        this.updateUser.status = false;
        throw error;
      });
      await this.fetch();
      const toastStore = useToast();
      toastStore.show({
        message: "User updated successfully",
        type: "success",
        dismissible: true,
        autoClose: true,
      });
      return true;
    },
  },
});
