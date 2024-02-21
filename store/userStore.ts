import { defineStore } from "pinia";
import type { Volo_Abp_Identity_IdentityUserDto } from "~/services/proxy/src";
import { getAbpServiceProxy } from "~/store/state";
import type { FetchQueryParamsType } from "~/types/fetchParams";

interface UserState {
  users: Volo_Abp_Identity_IdentityUserDto[];
  error: { status: number; message: string } | null;
  isLoading: boolean;
  totalCount: number;
}

export const useUsers = defineStore("users", {
  state: (): UserState => ({
    users: [],
    error: null,
    isLoading: false,
    totalCount: 0,
  }),
  actions: {
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
  },
});
