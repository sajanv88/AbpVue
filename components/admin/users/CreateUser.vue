<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import Alert from "~/components/shared/Alert.vue";
import { useUsers } from "~/store/state";
import UserInformation from "~/components/admin/users/UserInformation.vue";
import UserRoleList from "~/components/admin/users/UserRoleList.vue";
import { storeToRefs } from "pinia";
import type { Volo_Abp_Identity_IdentityUserCreateDto } from "~/services/proxy/src";

interface ICreateUser {
  edit?: boolean;
  open: boolean;
}
const props = defineProps<ICreateUser>();
const userStore = useUsers();
const { createUser, updateUser } = storeToRefs(userStore);
const processing = ref(false);
const emit = defineEmits(["dialogClose"]);
const dialogTitle = "Create User";
const onCloseDialog = () => {
  emit("dialogClose");
};

const error = computed(() => {
  return updateUser.value.error || createUser.value.error;
});

const selectedTab = ref<"user" | "role">("user");

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

  console.log(formValue, "formValue");
  if (!props.edit) {
    const payload: Volo_Abp_Identity_IdentityUserCreateDto = {
      userName: formValue.userName as string,
      name: formValue.name as string,
      surname: formValue.surname as string,
      email: formValue.email as string,
      phoneNumber: formValue.phoneNumber as string,

      isActive: formValue.isActive === "true",
      lockoutEnabled: formValue.lockoutEnabled === "true",
      password: formValue.password as string,
    };
    const success = await userStore.createNewUser(payload).finally(() => {
      processing.value = false;
    });
    if (success) {
      emit("dialogClose");
    }
    return;
  }

  const payload = {
    id: formValue.id as string,
    userName: formValue.userName as string,
    name: formValue.name as string,
    surname: formValue.surname as string,
    email: formValue.email as string,
    phoneNumber: formValue.phoneNumber as string,

    isActive: formValue.isActive === "true",
    lockoutEnabled: formValue.lockoutEnabled === "true",
  };
  userStore.updateExistingUser(payload).finally(() => {
    processing.value = false;
  });
};
</script>

<template>
  <Dialog id="user" :title="dialogTitle" :open="open" @close="onCloseDialog">
    <Alert v-if="error" type="error" :message="error.message" />
    <form class="p-4 md:p-5" @submit="onSubmitForm">
      <section class="flex items-center space-x-2 mb-5">
        <button
          type="button"
          @click="selectedTab = 'user'"
          class="py-2.5 me-5 mb-2 text-sm font-medium text-gray-900 border-gray-200 hover:text-gray-800 dark:border-gray-600 dark:hover:text-white"
          :class="
            selectedTab === 'user'
              ? 'border-b-2 font-semibold text-gray-800 dark:text-white '
              : 'dark:text-gray-500 text-gray-400'
          "
        >
          User Information
        </button>
        <button
          type="button"
          @click="selectedTab = 'role'"
          :class="
            selectedTab == 'role'
              ? 'border-b-2 font-semibold text-gray-800 dark:text-white'
              : 'dark:text-gray-500 text-gray-400'
          "
          class="py-2.5 me-5 mb-2 text-sm font-medium text-gray-900 border-gray-200 hover:text-gray-800 dark:border-gray-600 dark:hover:text-white"
        >
          Roles
        </button>
      </section>
      <UserInformation v-if="selectedTab === 'user'" />
      <UserRoleList v-if="selectedTab === 'role'" />
      <footer class="flex items-center justify-end space-x-2 mt-5">
        <span v-if="createUser.status" class="text-gray-700 dark:text-white"
          >Creating a new user...</span
        >
        <span v-if="updateUser.status" class="text-gray-700 dark:text-white"
          >Updating a user...</span
        >
        <button
          v-if="!processing"
          type="button"
          @click="onCloseDialog"
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
