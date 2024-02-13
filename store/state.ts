import { defineStore } from "pinia";
import type { TokenSet } from "~/types/tokenSet";
import type {
  Volo_Abp_Application_Dtos_PagedResultDto_1,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto,
  Volo_Abp_TenantManagement_TenantCreateDto,
  Volo_Abp_TenantManagement_TenantDto,
} from "~/services/proxy/src";
import type { GrantedPolicyType } from "~/types/grantedPolicies";

type TokenSetState = { jwt?: TokenSet };
export const getAbpServiceProxy = () => "/api/abpServiceProxy";

export const useTokenSet = defineStore("tokenSet", {
  state: () => ({
    accessToken: "",
    tokenType: "",
    expiresAt: 0,
    idToken: "",
    scope: "",
  }),
  actions: {
    async fetch() {
      const { data, error } = await useFetch("/api/jwt");
      const response: TokenSetState = data.value as TokenSetState;
      if (response.jwt) {
        this.accessToken = response.jwt.access_token;
        this.tokenType = response.jwt.token_type;
        this.expiresAt = response.jwt.expires_at;
        this.idToken = response.jwt.id_token;
        this.scope = response.jwt.scope;
      }
      console.log(error, "error");
      if (error) {
        return createError({
          statusCode: 401,
          message: "Unauthorized: Please login.",
        });
      }
    },
  },
});

type AbpConfigurationState = {
  config: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto | null;
  error: { message: string; statusCode: number } | null;
  grantedPolicies: Map<GrantedPolicyType, boolean> | null;
};

export const useAbpConfiguration = defineStore("abpConfiguration", {
  state: (): AbpConfigurationState => {
    return {
      config: null,
      error: null,
      grantedPolicies: null,
    };
  },

  actions: {
    async fetch() {
      const url = `${getAbpServiceProxy()}/abp/application-configuration`;
      const { data, error } = await useFetch(url);
      if (error.value) {
        this.error = error.value as AbpConfigurationState["error"];
      }
      const response = data.value as AbpConfigurationState["config"];
      if (response) {
        this.config = response;

        if (response.auth?.grantedPolicies) {
          const keys = Object.entries(response.auth.grantedPolicies);
          this.grantedPolicies = new Map<GrantedPolicyType, boolean>();
          for (const [key, value] of keys) {
            const localKey =
              `is${key.split(".").join("")}` as GrantedPolicyType;
            this.grantedPolicies.set(localKey, value);
          }
        }
      }
    },
  },
});

type AbpTenantState = {
  tenants: Volo_Abp_TenantManagement_TenantDto[] | null;
  totalCount: number;
  error: { message: string; statusCode: number } | null;
  isLoading: boolean;
  isCreating: boolean;
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
      isCreating: false,
    };
  },
  actions: {
    async createTenant(payload: Volo_Abp_TenantManagement_TenantCreateDto) {
      this.isCreating = true;
      const url = `${getAbpServiceProxy()}/multi-tenancy/tenants`;
      const { pending, error } = await useFetch(url, {
        method: "POST",
        body: payload,
      });
      if (error.value) {
        this.error = error.value as AbpTenantState["error"];
        return;
      }
      this.isCreating = false;
      await this.fetch();
      return true;
    },
    async fetch(params?: TenantFetchProps) {
      this.isLoading = true;
      let url = `${getAbpServiceProxy()}/multi-tenancy/tenants`;
      if (params && Object.keys(params).length > 0) {
        const queries = Object.entries(params);
        const queryParam: string[] = [];
        for (const [key, value] of queries) {
          queryParam.push(`${key}=${value}`);
        }
        url = `${url}?${queryParam.join("&")}`;
      }
      const { data, error } = await useFetch(url);

      if (error.value) {
        this.error = error.value as AbpTenantState["error"];
        this.isLoading = false;
      }
      const response = data.value as Volo_Abp_Application_Dtos_PagedResultDto_1;
      if (response) {
        this.tenants = response?.items as AbpTenantState["tenants"];
        this.totalCount = response?.totalCount as AbpTenantState["totalCount"];
        this.isLoading = false;
      }
    },
  },
});
