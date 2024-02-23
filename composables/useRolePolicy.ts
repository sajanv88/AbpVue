import { useAbpConfiguration } from "~/store/state";

export const useRolePolicy = () => {
  const abpConfigStore = useAbpConfiguration();
  const canDeleteRole = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesDelete",
  );
  const canUpdateRole = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesUpdate",
  );
  const canManageRolePermissions = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesManagePermissions",
  );
  const canCreateRole = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityRolesCreate",
  );
  return {
    canDeleteRole,
    canUpdateRole,
    canCreateRole,
    canManageRolePermissions,
  };
};
