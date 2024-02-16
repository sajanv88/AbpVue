import type {
  Volo_Abp_Application_Dtos_PagedResultDto_1,
  Volo_Abp_TenantManagement_TenantCreateDto,
  Volo_Abp_TenantManagement_TenantDto,
  Volo_Abp_TenantManagement_TenantUpdateDto,
} from "~/services/proxy/src";

import { defineStore } from "pinia";
import { getAbpServiceProxy } from "~/store/state";

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

type TenantFetchProps = {
  Filter?: string;
  Sorting?: string;
  SkipCount?: number;
  MaxResultCount?: number;
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
    async updateTenant(
      tenantId: string,
      payload: Volo_Abp_TenantManagement_TenantUpdateDto,
    ) {
      this.updateTenant.status = true;
      const url = `${getAbpServiceProxy()}/multi-tenancy/tenants/${tenantId}`;
      const { pending, error } = await useFetch(url, {
        method: "PUT",
        body: payload,
      });

      if (error.value) {
        this.updateTenant.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        } as AbpTenantState["error"];
        this.updateTenant.status = false;
        return;
      }
      this.updateTenant.status = false;
      this.updateTenant.error = null;
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
      const url = `${getAbpServiceProxy()}/multi-tenancy/tenants/${tenantId}`;
      const { data, error } = await useFetch(url);
      if (error.value) {
        this.selectedTenant.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        } as AbpTenantState["error"];
        this.selectedTenant.isLoaded = false;
        return;
      }
      this.selectedTenant.data =
        data.value as Volo_Abp_TenantManagement_TenantDto;
    },
    async createTenant(payload: Volo_Abp_TenantManagement_TenantCreateDto) {
      if (this.create.error) this.create.error = null;
      this.create.status = true;
      const url = `${getAbpServiceProxy()}/multi-tenancy/tenants`;

      const { pending, error } = await useFetch(url, {
        method: "POST",
        body: payload,
      });

      if (error.value) {
        this.create.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        } as AbpTenantState["error"];
        this.create.status = false;
        return;
      }
      this.create.status = false;
      this.create.error = null;
      await this.fetch();
      return true;
    },
    async fetch(params?: TenantFetchProps) {
      this.isLoading = true;
      const url = `${getAbpServiceProxy()}/multi-tenancy/tenants`;
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
