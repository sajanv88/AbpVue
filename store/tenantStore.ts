import type {
  Volo_Abp_Application_Dtos_PagedResultDto_1,
  Volo_Abp_TenantManagement_TenantCreateDto,
  Volo_Abp_TenantManagement_TenantDto,
  Volo_Abp_TenantManagement_TenantUpdateDto,
} from "~/services/proxy/src";

import { defineStore } from "pinia";
import { getAbpServiceProxy, useToast } from "~/store/state";
import { $fetch } from "ofetch";
import type { FetchQueryParamsType } from "~/types/fetchParams";

type AbpTenantState = {
  tenants: Volo_Abp_TenantManagement_TenantDto[] | null;
  totalCount: number;
  error: { message: string; statusCode: number } | null;
  isLoading: boolean;
  create: {
    error: { message: string; statusCode: number } | null;
    status: boolean;
  };
  selectedTenant: {
    isLoaded: boolean;
    data: Volo_Abp_TenantManagement_TenantDto | null;
    error: { message: string; statusCode: number } | null;
  };
  updateTenant: {
    status: boolean;
    error: { message: string; statusCode: number } | null;
  };
};

export const useTenants = defineStore("tenants", {
  state: (): AbpTenantState => {
    return {
      tenants: null,
      error: null,
      totalCount: 0,
      isLoading: false,
      create: {
        error: null,
        status: false,
      },
      selectedTenant: {
        isLoaded: false,
        data: null,
        error: null,
      },
      updateTenant: {
        status: false,
        error: null,
      },
    };
  },
  actions: {
    async updateTenant(payload: Volo_Abp_TenantManagement_TenantUpdateDto) {
      this.updateTenant.status = true;
      const tenantId = this.selectedTenant.data?.id;
      const url = `${getAbpServiceProxy("/multi-tenancy/tenants")}/${tenantId}`;
      await $fetch(url, {
        method: "PUT",
        body: payload,
      }).catch((error) => {
        if (error.value) {
          this.updateTenant.error = {
            message: error.value.statusMessage,
            statusCode: error.value.statusCode,
          } as AbpTenantState["error"];
          this.updateTenant.status = false;
          throw error;
        }
      });

      this.updateTenant.status = false;
      this.updateTenant.error = null;
      const toastStore = useToast();
      toastStore.show({
        show: true,
        message: "Tenant updated successfully",
        dismissible: true,
        type: "success",
        autoClose: true,
      });
      await this.fetch();
      return true;
    },
    resetSelectedTenant() {
      this.selectedTenant = {
        isLoaded: false,
        data: null,
        error: null,
      };
    },
    async getSelectedTenant(tenantId: string) {
      this.selectedTenant.isLoaded = true;
      const url = `${getAbpServiceProxy("/multi-tenancy/tenants")}/${tenantId}`;
      const data = await $fetch(url).catch((error) => {
        if (error) {
          this.selectedTenant.error = {
            message: error.statusMessage,
            statusCode: error.statusCode,
          } as AbpTenantState["error"];
          this.selectedTenant.isLoaded = false;
          const toastStore = useToast();
          toastStore.show({
            show: true,
            message: `Error: ${error.statusMessage}. Please try again.`,
            dismissible: true,
            type: "error",
          });
          throw error;
        }
      });

      this.selectedTenant.data = data as Volo_Abp_TenantManagement_TenantDto;
    },
    async createTenant(payload: Volo_Abp_TenantManagement_TenantCreateDto) {
      if (this.create.error) this.create.error = null;
      this.create.status = true;
      const url = `${getAbpServiceProxy("/multi-tenancy/tenants")}`;

      await $fetch(url, {
        method: "POST",
        body: payload,
      }).catch((error) => {
        if (error) {
          this.create.error = {
            message: error.statusMessage,
            statusCode: error.statusCode,
          } as AbpTenantState["error"];
          this.create.status = false;
          throw error;
        }
      });

      this.create.status = false;
      this.create.error = null;
      const toastStore = useToast();
      toastStore.show({
        show: true,
        message: "Tenant Created successfully",
        dismissible: true,
        type: "success",
        autoClose: true,
      });
      await this.fetch();
      return true;
    },
    async fetch(params?: FetchQueryParamsType) {
      this.isLoading = true;
      const url = `${getAbpServiceProxy("/multi-tenancy/tenants")}`;
      const { data, error } = await useFetch(url, {
        ...(params && { query: params }),
      });

      if (error.value) {
        this.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        } as AbpTenantState["error"];
        this.isLoading = false;
      }
      const response = data.value as Volo_Abp_Application_Dtos_PagedResultDto_1;

      this.tenants = response?.items as AbpTenantState["tenants"];
      this.totalCount = response?.totalCount as AbpTenantState["totalCount"];
      this.isLoading = false;
      this.error = null;
    },
  },
});
