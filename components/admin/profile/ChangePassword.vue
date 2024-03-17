<script setup lang="ts">
import type { Volo_Abp_Account_ChangePasswordInput } from "~/services/proxy/src";
import Icon from "~/components/shared/Icon.vue";
import { useProfile } from "~/store/state";
import { Input } from "~/abp/ui/input";

const profileStore = useProfile();
const processing = ref(false);
type PasswordViewerType = {
  currentPassword: { fieldValue: string; visible: boolean };
  newPassword: { fieldValue: string; visible: boolean };
  confirmPassword: { fieldValue: string; visible: boolean };
};
const passwordViewer = ref<PasswordViewerType>({
  currentPassword: {
    fieldValue: "",
    visible: false,
  },
  newPassword: {
    fieldValue: "",
    visible: false,
  },
  confirmPassword: {
    fieldValue: "",
    visible: false,
  },
});

const onSubmitEvent = async (e: SubmitEvent) => {
  processing.value = true;
  e.stopImmediatePropagation();
  e.preventDefault();
  const formElem = e.target as HTMLFormElement;
  const payload = new FormData(formElem);
  const data = Object.fromEntries(payload.entries());
  const payloadData: Volo_Abp_Account_ChangePasswordInput = {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  };
  await profileStore
    .changePassword(payloadData, data.confirmPassword)
    .finally(() => {
      processing.value = false;
    });
};

const onTogglePassword = (field: string) => {
  passwordViewer.value[field].visible = !passwordViewer.value[field].visible;
};

const formNotValid = computed(() => {
  return (
    passwordViewer.value.confirmPassword.fieldValue !==
    passwordViewer.value.newPassword.fieldValue
  );
});
</script>

<template>
  <h1
    class="text-3xl font-semibold text-gray-800 dark:text-white pb-5 border-b"
  >
    Change Password
  </h1>
  <form @submit="onSubmitEvent" class="mt-5">
    <div class="grid gap-2 grid-cols-12 space-y-3">
      <div class="col-span-12">
        <label
          for="currentPassword"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Current password *</label
        >
        <div
          class="flex items-center"
          :key="passwordViewer.currentPassword.visible"
        >
          <Input
            id="currentPassword"
            :type="passwordViewer.currentPassword.visible ? 'text' : 'password'"
            name="currentPassword"
            @input="
              passwordViewer.currentPassword.fieldValue = $event.target.value
            "
            :default-value="passwordViewer.currentPassword.fieldValue"
            class="p-6 pl-3"
            required
          />
          <Button
            type="button"
            @click="() => onTogglePassword('currentPassword')"
            variant="ghost"
            size="icon"
            :key="passwordViewer.currentPassword.visible"
          >
            <Icon
              :icon="
                passwordViewer.currentPassword.visible ? 'eye' : 'eye-slash'
              "
            />
            <span class="sr-only">Eye</span>
          </Button>
        </div>
      </div>
      <div class="col-span-12">
        <label
          for="newPassword"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >New password *</label
        >
        <div
          class="flex items-center"
          :key="passwordViewer.newPassword.visible"
        >
          <Input
            id="newPassword"
            :type="passwordViewer.newPassword.visible ? 'text' : 'password'"
            name="newPassword"
            @input="passwordViewer.newPassword.fieldValue = $event.target.value"
            :default-value="passwordViewer.newPassword.fieldValue"
            class="p-6 pl-3"
            required
          />
          <Button
            type="button"
            @click="() => onTogglePassword('newPassword')"
            variant="ghost"
            size="icon"
          >
            <Icon
              :icon="passwordViewer.newPassword.visible ? 'eye' : 'eye-slash'"
            />
            <span class="sr-only">Eye</span>
          </Button>
        </div>
      </div>
      <div class="col-span-12">
        <label
          for="confirmPassword"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Confirm new password *</label
        >
        <div
          class="flex items-center"
          :key="passwordViewer.confirmPassword.visible"
        >
          <Input
            id="confirmPassword"
            name="confirmPassword"
            :type="passwordViewer.confirmPassword.visible ? 'text' : 'password'"
            @input="
              passwordViewer.confirmPassword.fieldValue = $event.target.value
            "
            :default-value="passwordViewer.confirmPassword.fieldValue"
            class="p-6 pl-3"
            :class="
              formNotValid
                ? 'border-red-500 dark:border-s-red-700 dark:border-red-600'
                : 'border-gray-300 dark:border-s-gray-700 dark:border-gray-600'
            "
            required
          />
          <Button
            type="button"
            @click="() => onTogglePassword('confirmPassword')"
            variant="ghost"
            size="icon"
          >
            <Icon
              :icon="
                passwordViewer.confirmPassword.visible ? 'eye' : 'eye-slash'
              "
            />
            <span class="sr-only">Eye</span>
          </Button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <span v-if="processing" class="text-gray-500 dark:text-white"
        >Saving...</span
      >
      <Button v-if="!processing" type="submit" :disabled="formNotValid">
        Save
      </Button>
    </div>
  </form>
</template>

<style scoped></style>
