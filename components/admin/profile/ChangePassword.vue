<script setup lang="ts">
import type { Volo_Abp_Account_ChangePasswordInput } from "~/services/proxy/src";
import Icon from "~/components/shared/Icon.vue";
import { useProfile } from "~/store/state";

const profileStore = useProfile();
const processing = ref(false);

const passwordViewer = ref({
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
          <input
            id="currentPassword"
            :type="passwordViewer.currentPassword.visible ? 'text' : 'password'"
            name="currentPassword"
            @input="
              passwordViewer.currentPassword.fieldValue = $event.target.value
            "
            :value="passwordViewer.currentPassword.fieldValue"
            class="block p-3 w-full text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            required
          />
          <button
            type="button"
            @click="() => onTogglePassword('currentPassword')"
            class="p-3 text-gray-900 dark:text-white focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 focus:border-blue-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Icon
              :icon="
                passwordViewer.currentPassword.visible ? 'eye' : 'eye-slash'
              "
            />
            <span class="sr-only">Eye</span>
          </button>
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
          <input
            id="newPassword"
            :type="passwordViewer.newPassword.visible ? 'text' : 'password'"
            name="newPassword"
            @input="passwordViewer.newPassword.fieldValue = $event.target.value"
            :value="passwordViewer.newPassword.fieldValue"
            class="block p-3 w-full text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            required
          />
          <button
            type="button"
            @click="() => onTogglePassword('newPassword')"
            class="p-3 text-gray-900 dark:text-white focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 focus:border-blue-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Icon
              :icon="passwordViewer.newPassword.visible ? 'eye' : 'eye-slash'"
            />
            <span class="sr-only">Eye</span>
          </button>
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
          <input
            id="confirmPassword"
            name="confirmPassword"
            :type="passwordViewer.confirmPassword.visible ? 'text' : 'password'"
            @input="
              passwordViewer.confirmPassword.fieldValue = $event.target.value
            "
            :value="passwordViewer.confirmPassword.fieldValue"
            class="block p-3 w-full text-gray-900 bg-gray-50 border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            :class="
              formNotValid
                ? 'border-red-500 dark:border-s-red-700 dark:border-red-600'
                : 'border-gray-300 dark:border-s-gray-700 dark:border-gray-600'
            "
            required
          />
          <button
            type="button"
            @click="() => onTogglePassword('confirmPassword')"
            class="p-3 text-gray-900 dark:text-white focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 focus:border-blue-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Icon
              :icon="
                passwordViewer.confirmPassword.visible ? 'eye' : 'eye-slash'
              "
            />
            <span class="sr-only">Eye</span>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <span v-if="processing" class="text-gray-500 dark:text-white"
        >Saving...</span
      >
      <button
        v-if="!processing"
        type="submit"
        :disabled="formNotValid"
        class="inline-flex items-center px-8 py-2 font-medium text-gray-900 dark:text-white focus:outline-none bg-white"
        :class="
          formNotValid
            ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
            : 'border border-gray-200 focus:border-blue-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        "
      >
        Save
      </button>
    </div>
  </form>
</template>

<style scoped></style>
