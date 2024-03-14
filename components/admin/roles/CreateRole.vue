<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import { useAbpConfiguration, useRoles } from "~/store/state";
import { storeToRefs } from "pinia";
import Alert from "~/components/shared/Alert.vue";
import Checkbox from "~/components/shared/Checkbox.vue";
import { Input } from "~/abp/ui/input";
import type {
  Volo_Abp_Identity_IdentityRoleCreateDto,
  Volo_Abp_Identity_IdentityRoleUpdateDto,
} from "~/services/proxy/src";

const roleStore = useRoles();
const abpConfigStore = useAbpConfiguration();
const currentUser = abpConfigStore.config?.currentUser;
const { createRole, updateRole } = storeToRefs(roleStore);
interface ICreateRole {
  edit?: boolean;
  open: boolean;
}
const props = defineProps<ICreateRole>();
const processing = ref(false);
const roleName = ref("");
const emit = defineEmits(["dialogClose"]);
const onSubmitForm = async (e: SubmitEvent) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  processing.value = true;
  const formElem = e.target as HTMLFormElement;
  const formData = new FormData(formElem);
  const formValue: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    formValue[key] = value;
  }
  if (!props.edit) {
    const payload: Volo_Abp_Identity_IdentityRoleCreateDto = {
      name: formValue.name as string,
      isDefault: formValue.isDefault == "true",
      isPublic: formValue.isPublic == "true",
    };
    const success = await roleStore.createNewRole(payload).finally(() => {
      processing.value = false;
    });
    if (success) {
      emit("dialogClose");
    }
  } else {
    const payload: Volo_Abp_Identity_IdentityRoleUpdateDto = {
      name: formValue.name as string,
      isDefault: formValue.isDefault == "true",
      isPublic: formValue.isPublic == "true",
    };
    const success = await roleStore.updateExistingRole(payload).finally(() => {
      processing.value = false;
    });
    if (success) {
      emit("dialogClose");
    }
  }
};

const onCloseDialog = () => {
  roleStore.resetError();
  roleStore.resetSelectedRole();
  emit("dialogClose");
};

const dialogTitle = props.edit ? "Edit Role" : "New Role";
const shouldDisabled = computed(() => {
  if (!props.edit) {
    return false;
  }
  if (roleStore.selectedRole.data?.name === "admin") {
    return currentUser?.roles?.includes(roleStore.selectedRole.data.name);
  }
  return false;
});
</script>

<template>
  <Dialog id="roles" :title="dialogTitle" :open="open" @close="onCloseDialog">
    <Alert
      v-if="createRole.error"
      type="error"
      :message="createRole.error.message"
    />
    <form @submit="onSubmitForm">
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Role name *</label
          >
          <Input
            type="text"
            name="name"
            id="name"
            :disabled="shouldDisabled"
            @input="roleName = $event.target.value"
            :default-value="roleStore.selectedRole.data?.name ?? roleName"
            class="p-6 pl-3"
            required
          />
        </div>
        <div class="col-span-2">
          <Checkbox
            :id="'isDefault'"
            :name="'isDefault'"
            :checked="roleStore.selectedRole.data?.isDefault ?? 'false'"
            :label="'Default'"
          />
        </div>
        <div class="col-span-2">
          <Checkbox
            :id="'isPublic'"
            :name="'isPublic'"
            :checked="roleStore.selectedRole.data?.isPublic ?? 'false'"
            :label="'Public'"
          />
        </div>
      </div>
      <footer class="flex items-center justify-end space-x-2">
        <span v-if="createRole.status" class="text-gray-700 dark:text-white"
          >Creating a New Role...</span
        >
        <span v-if="updateRole.status" class="text-gray-700 dark:text-white"
          >Updating Role...</span
        >
        <Button
          v-if="!processing"
          type="button"
          @click="onCloseDialog"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button v-if="!processing" type="submit">Save</Button>
      </footer>
    </form>
  </Dialog>
</template>

<style scoped></style>
