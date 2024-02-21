import { useAbpConfiguration } from "~/store/state";

export const useTenantPolicy = () => {
  const abpConfigStore = useAbpConfiguration();

  const canDeleteTenant = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsDelete",
  );
  const canUpdateTenant = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsUpdate",
  );
  const canManageFeatures = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsManageFeatures",
  );
  const canCreateTenant = abpConfigStore?.grantedPolicies?.get(
    "isAbpTenantManagementTenantsCreate",
  );
  return {
    canDeleteTenant,
    canUpdateTenant,
    canCreateTenant,
    canManageFeatures,
  };
};
