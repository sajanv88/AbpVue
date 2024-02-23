<script setup lang="ts">
import { useRoles, useUsers } from "~/store/state";
import Checkbox from "~/components/shared/Checkbox.vue";
import type {
  Volo_Abp_Identity_IdentityRoleDto,
  Volo_Abp_Identity_IdentityUserCreateDto,
  Volo_Abp_Identity_IdentityUserUpdateDto,
} from "~/services/proxy/src";
import { useCurrentUserRoles } from "#imports";

interface IUserRoleList {
  edit?: boolean;
}
const props = defineProps<IUserRoleList>();
const roleStore = useRoles();
const userStore = useUsers();
const selectedUserRoles = ref<Volo_Abp_Identity_IdentityRoleDto[]>([]);
const userRoles = ref<Volo_Abp_Identity_IdentityRoleDto[]>([]);

await roleStore.fetch().finally(async () => {
  if (props.edit) {
    const temp = await useCurrentUserRoles(userStore.selectedUserId);
    userRoles.value = temp?.items ?? []; // assign the currently selected user's roles in the userRoles ref object for the later use.

    // Iterate through the userRoles and update the roleStore.roles with the userRoles.
    temp?.items?.forEach((userRole) => {
      roleStore.roles.forEach((role) => {
        if (userRole.name === role.name) {
          if (userRole.isDefault) {
            role.isDefault = userRole.isDefault;
          } else if (userRole.isPublic) {
            role.isPublic = userRole.isPublic;
          } else if (userRole.isStatic) {
            role.isStatic = userRole.isStatic;
          }
        }
      });
    });
  }
  // Iterate through the roleStore.roles and update the selectedUserRoles with the roleStore.roles for  rendering in the template.
  roleStore.roles.forEach((role) => {
    selectedUserRoles.value.push(role);
  });
});

// Update the user input data with the roles in the userStore
const updateUserInputRoles = (
  user:
    | Volo_Abp_Identity_IdentityUserCreateDto
    | Volo_Abp_Identity_IdentityUserUpdateDto,
) => {
  userStore.setUserInputData(user);
};

const onChangeEvent = (checked: boolean, roleName: string) => {
  const userInput = userStore.userInputData;
  if (props.edit) {
    if (!userInput?.roleNames) {
      const newUserInput = {
        ...userInput,
        roleNames: [],
      } as Volo_Abp_Identity_IdentityUserUpdateDto;
      if (checked) {
        newUserInput.roleNames!.push(roleName);
      } else {
        newUserInput.roleNames = newUserInput.roleNames!.filter(
          (role) => role !== roleName,
        );
      }
      updateUserInputRoles(newUserInput);
    } else if (userInput!.roleNames) {
      if (!checked) {
        userInput!.roleNames = userInput!.roleNames!.filter(
          (role) => role !== roleName,
        );
      } else if (checked) {
        userInput!.roleNames!.push(roleName);
      }
      updateUserInputRoles(userInput!);
    }
  } else {
    if (!userInput) {
      const newUserInput = {
        roleNames: [],
        email: "",
        name: "",
        surname: "",
        userName: "",
        password: "",
      } as Volo_Abp_Identity_IdentityUserCreateDto;
      if (checked) {
        newUserInput.roleNames!.push(roleName);
      } else {
        newUserInput!.roleNames = newUserInput!.roleNames!.filter(
          (role) => role !== roleName,
        );
      }
      updateUserInputRoles(newUserInput);
    } else {
      if (checked) {
        userInput.roleNames!.push(roleName);
      } else {
        userInput!.roleNames = userInput!.roleNames!.filter(
          (role) => role !== roleName,
        );
      }
      updateUserInputRoles(userInput);
    }
  }
};

const getCheckedStatus = (role: Volo_Abp_Identity_IdentityRoleDto) => {
  if (props.edit) {
    const findUserRole = userRoles.value.find(
      (userRole) => userRole.name === role.name,
    );
    if (findUserRole) {
      if (findUserRole.isDefault) {
        return findUserRole.isDefault;
      } else if (findUserRole.isPublic) {
        return findUserRole.isPublic;
      } else if (findUserRole.isStatic) {
        return findUserRole.isStatic;
      }
    }
    return false;
  }
  return role.isDefault ?? false;
};

selectedUserRoles.value.forEach((role) => {
  onChangeEvent(getCheckedStatus(role), role.name!);
});
</script>

<template>
  <section class="grid gap-2 grid-cols-12 space-y-3">
    <div class="col-span-12" v-for="role in selectedUserRoles" :key="role.id">
      <Checkbox
        :id="role.name"
        :name="role.name"
        :checked="getCheckedStatus(role).toString()"
        :label="role.name"
        @on-change-event="(checked) => onChangeEvent(checked, role.name!)"
      />
    </div>
  </section>
</template>

<style scoped></style>
