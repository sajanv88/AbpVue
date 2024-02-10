import { defineStore } from "pinia";
import type { TokenSet } from "~/types/tokenSet";
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto } from "~/services/proxy/src";

type TokenSetState = { jwt?: TokenSet };
const getAbpServiceProxy = () => "/api/abpServiceProxy";
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
      if (error.value) {
        throw new Error(error.value.message);
      }
    },
  },
});

type AbpConfigurationState = {
  config: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto | null;
  error: { message: string; statusCode: number } | null;
};
export const useAbpConfiguration = defineStore("abpConfiguration", {
  state: (): AbpConfigurationState => {
    return {
      config: null,
      error: null,
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

      if (!response?.currentUser?.isAuthenticated) {
        throw createError({
          statusCode: 401,
          message: "User is not authenticated",
        });
      }
      this.config = response;
    },
  },
});
