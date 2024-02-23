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
  userInputData:
    | Volo_Abp_Identity_IdentityUserCreateDto
    | Volo_Abp_Identity_IdentityUserUpdateDto
    | null;
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
    userInputData: null,
  }),
  actions: {
    setSelectedUserId(id: string) {
      this.selectedUserId = id;
    },
    async validateUserInputData(type: "create" | "update") {
      console.log(this.userInputData, type);
      if (!this.userInputData)
        throw new Error("Bad request: No user information provided.");
      for (const key in this.userInputData) {
        if (type === "create") {
          if (
            this.userInputData.userName === "" ||
            this.userInputData.email === "" ||
            this.userInputData.password === ""
          ) {
            throw new Error("Please fill in all required fields");
          }
        } else if (type === "update") {
          if (
            this.userInputData.userName === "" ||
            this.userInputData.email === ""
          ) {
            throw new Error("Please fill in all required fields");
          }
        }
      }
    },
    resetErrors() {
      this.error = null;
      this.createUser.error = null;
      this.createUser.status = false;
      this.updateUser.error = null;
      this.updateUser.status = false;
    },
    setUserInputData(data: UserState["userInputData"]) {
      if (this.userInputData) {
        this.userInputData = {
          ...this.userInputData,
          ...data,
        };
        return;
      }
      this.userInputData = data;
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
      await this.validateUserInputData("create").catch((error) => {
        this.createUser.error = {
          status: 400,
          message: error.message,
        };
        this.createUser.status = false;
        throw error;
      });

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
      await this.validateUserInputData("update").catch((error) => {
        this.updateUser.error = {
          status: 400,
          message: error.message,
        };
        this.updateUser.status = false;
        throw error;
      });
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
