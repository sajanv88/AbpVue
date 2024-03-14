<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import Alert from "~/components/shared/Alert.vue";
import { useUsers } from "~/store/state";
import UserInformation from "~/components/admin/users/UserInformation.vue";
import UserRoleList from "~/components/admin/users/UserRoleList.vue";
import { storeToRefs } from "pinia";
import type {
  Volo_Abp_Identity_IdentityUserCreateDto,
  Volo_Abp_Identity_IdentityUserUpdateDto,
} from "~/services/proxy/src";

interface ICreateUser {
  edit?: boolean;
  open: boolean;
}
const props = defineProps<ICreateUser>();
const userStore = useUsers();
const { createUser, updateUser } = storeToRefs(userStore);
const processing = ref(false);
const emit = defineEmits(["dialogClose"]);
const dialogTitle = props.edit ? "Edit user" : "Create User";

const onCloseDialog = () => {
  userStore.resetErrors();
  if (props.edit) {
    userStore.setSelectedUserId("");
  }
  emit("dialogClose");
};

const error = computed(() => {
  return updateUser.value.error || createUser.value.error;
});

const selectedTab = ref<"user" | "role">("user");

const onSubmitForm = async (e: SubmitEvent) => {
  userStore.resetErrors();

  e.stopImmediatePropagation();
  e.preventDefault();
  processing.value = true;

  if (!props.edit) {
    const payload =
      userStore.userInputData as Volo_Abp_Identity_IdentityUserCreateDto;
    const success = await userStore.createNewUser(payload).finally(() => {
      processing.value = false;
    });
    if (success) {
      onCloseDialog();
    }
    return;
  }

  const payload =
    userStore.userInputData as Volo_Abp_Identity_IdentityUserUpdateDto;
  console.log(payload, "payload");
  const success = await userStore.updateExistingUser(payload).finally(() => {
    processing.value = false;
  });
  if (success) {
    onCloseDialog();
  }
};
</script>

<template>
  <Dialog id="user" :title="dialogTitle" :open="open" @close="onCloseDialog">
    <Alert v-if="error" type="error" :message="error.message" />
    <form @submit="onSubmitForm" :novalidate="selectedTab !== 'user'">
      <section class="flex items-center space-x-2 mb-5">
        <Button
          type="button"
          @click="selectedTab = 'user'"
          :variant="selectedTab == 'user' ? 'default' : 'link'"
        >
          User Information
        </Button>
        <Button
          type="button"
          @click="selectedTab = 'role'"
          :variant="selectedTab == 'role' ? 'default' : 'link'"
        >
          Roles
        </Button>
      </section>

      <UserInformation v-show="selectedTab === 'user'" :edit="edit" />
      <UserRoleList v-show="selectedTab === 'role'" :edit="edit" />

      <footer class="flex items-center justify-end space-x-2 mt-5">
        <span v-if="createUser.status" class="text-gray-700 dark:text-white"
          >Creating a new user...</span
        >
        <span v-if="updateUser.status" class="text-gray-700 dark:text-white"
          >Updating a user...</span
        >
        <Button
          v-if="!processing"
          type="button"
          @click="onCloseDialog"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button v-if="!processing" type="submit"> Save </Button>
      </footer>
    </form>
  </Dialog>
</template>

<style scoped></style>
