<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import { useRoles } from "~/store/state";
import { storeToRefs } from "pinia";
import Alert from "~/components/shared/Alert.vue";
import Checkbox from "~/components/shared/Checkbox.vue";
import type { Volo_Abp_Identity_IdentityRoleCreateDto } from "~/services/proxy/src";

const roleStore = useRoles();
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
  }
};

const dialogTitle = props.edit ? "Edit Role" : "New Role";
</script>

<template>
  <Dialog
    id="roles"
    :title="dialogTitle"
    :open="open"
    @close="$emit('dialogClose')"
  >
    <Alert
      v-if="createRole.error"
      type="error"
      :message="createRole.error.message"
    />
    <form class="p-4 md:p-5" @submit="onSubmitForm">
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Role name *</label
          >
          <input
            type="text"
            name="name"
            id="name"
            @input="roleName = $event.target.value"
            :value="roleStore.selectedRole.data?.name ?? roleName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
        <button
          v-if="!processing"
          type="button"
          @click="$emit('dialogClose')"
          class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Cancel
        </button>
        <button
          v-if="!processing"
          type="submit"
          class="inline-flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Save
        </button>
      </footer>
    </form>
  </Dialog>
</template>

<style scoped></style>
