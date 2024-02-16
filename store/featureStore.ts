import { defineStore } from "pinia";
import { getAbpServiceProxy } from "~/store/state";
import type {
  Volo_Abp_FeatureManagement_GetFeatureListResultDto,
  Volo_Abp_FeatureManagement_UpdateFeaturesDto,
} from "~/services/proxy/src";
import { PermissionProvider } from "~/types/permissionProvider";
import { $fetch } from "ofetch";

type AbpFeatureState = {
  featureGroups: Volo_Abp_FeatureManagement_GetFeatureListResultDto | null;
  isLoading: boolean;
  error: { message: string; statusCode: number } | null;
  selectedTenantId: string | null;
};

export const useFeatures = defineStore("features", {
  state: (): AbpFeatureState => {
    return {
      featureGroups: null,
      isLoading: false,
      error: null,
      selectedTenantId: null,
    };
  },
  actions: {
    async updateFeatureSettings(
      payload: Volo_Abp_FeatureManagement_UpdateFeaturesDto,
    ) {
      const url = `${getAbpServiceProxy()}/feature-management/features?providerName=${PermissionProvider.T}&providerKey=${this.selectedTenantId}`;

      const { error } = await useFetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      if (error.value) {
        this.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        } as AbpFeatureState["error"];
        return;
      }
      this.error = null;
      this.resetFeatures();
      return true;
    },
    async resetFeaturesToDefault(tenantId: string) {
      const url = `${getAbpServiceProxy()}/feature-management/features?providerName=${PermissionProvider.T}&providerKey=${tenantId}`;
      const { error } = await useFetch(url, {
        method: "DELETE",
      });
      if (error.value) {
        this.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        } as AbpFeatureState["error"];
        return;
      }
      this.selectedTenantId = null;
      this.error = null;
      this.resetFeatures();
      return true;
    },
    resetFeatures() {
      this.featureGroups = null;
      this.error = null;
      this.isLoading = false;
      this.selectedTenantId = null;
    },
    async fetch(tenantId: string) {
      this.selectedTenantId = tenantId;
      this.isLoading = true;
      const url = `${getAbpServiceProxy()}/feature-management/features?providerName=${PermissionProvider.T}&providerKey=${tenantId}`;
      const data = await $fetch(url).catch((error) => {
        if (error) {
          this.error = {
            message: error.value.statusMessage,
            statusCode: error.value.statusCode,
          } as AbpFeatureState["error"];
          this.isLoading = false;
        }
      });

      if (data) {
        this.featureGroups = data as AbpFeatureState["featureGroups"];
      }
      this.isLoading = false;
    },
  },
});
