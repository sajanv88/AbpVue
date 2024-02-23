import { useAbpConfiguration } from "~/store/state";

export const useUserPolicy = () => {
  const abpConfigStore = useAbpConfiguration();
  const canDeleteUser = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityUsersDelete",
  );
  const canUpdateUser = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityUsersUpdate",
  );
  const canManageUserPermission = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityUsersManagePermissions",
  );
  const canCreateUser = abpConfigStore?.grantedPolicies?.get(
    "isAbpIdentityUsersCreate",
  );
  return {
    canDeleteUser,
    canUpdateUser,
    canManageUserPermission,
    canCreateUser,
  };
};
