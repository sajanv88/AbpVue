<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import Alert from "~/components/shared/Alert.vue";
import type { Volo_Abp_SettingManagement_SendTestEmailInput } from "~/services/proxy/src";
import { useEmailing } from "~/store/state";

interface ITestingEmail {
  open: boolean;
}

defineProps<ITestingEmail>();
const emailStore = useEmailing();
const inputFieldRef = ref<Volo_Abp_SettingManagement_SendTestEmailInput>({
  senderEmailAddress: "",
  targetEmailAddress: "",
  subject: "",
  body: "",
});
const emit = defineEmits(["dialogClose"]);
const onCloseDialog = () => {
  emailStore.resetTestingEmail();
  emit("dialogClose");
};
const onSubmitForm = async (e: SubmitEvent) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  const formElem = e.target as HTMLFormElement;
  const formData = new FormData(formElem);
  const payload = Object.fromEntries(formData.entries());
  const success = await emailStore.sendTestEmail({
    senderEmailAddress: payload.senderEmailAddress as string,
    targetEmailAddress: payload.targetEmailAddress as string,
    subject: payload.subject as string,
    body: payload.body as string,
  });
  if (success) {
    onCloseDialog();
  }
};
</script>

<template>
  <Dialog
    id="emailTesting"
    title="Send test email"
    :open="open"
    @close="onCloseDialog"
  >
    <Alert
      v-if="emailStore.testEmail.error"
      type="error"
      :message="emailStore.testEmail.error.message"
    />
    <form class="p-4 md:p-5" @submit="onSubmitForm">
      <section class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
            for="senderEmailAddress"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Sender email address *</label
          >
          <input
            type="email"
            name="senderEmailAddress"
            id="senderEmailAddress"
            @input="inputFieldRef.senderEmailAddress = $event.target.value"
            :value="inputFieldRef.senderEmailAddress"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="targetEmailAddress"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Target email address *</label
          >
          <input
            type="email"
            name="targetEmailAddress"
            id="targetEmailAddress"
            @input="inputFieldRef.targetEmailAddress = $event.target.value"
            :value="inputFieldRef.targetEmailAddress"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="senderEmailAddress"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Subject *</label
          >
          <input
            type="text"
            name="subject"
            id="subject"
            @input="inputFieldRef.subject = $event.target.value"
            :value="inputFieldRef.subject"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="body"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Body</label
          >
          <input
            type="text"
            name="body"
            id="body"
            @input="inputFieldRef.body = $event.target.value"
            :value="inputFieldRef.body"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
      </section>
      <footer class="flex items-center justify-end space-x-2">
        <span
          v-if="emailStore.testEmail.status"
          class="text-gray-700 dark:text-white"
          >Sending test email...</span
        >
        <button
          v-if="!emailStore.testEmail.status"
          type="button"
          @click="onCloseDialog"
          class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Cancel
        </button>
        <button
          v-if="!emailStore.testEmail.status"
          type="submit"
          class="inline-flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Send
        </button>
      </footer>
    </form>
  </Dialog>
</template>

<style scoped></style>
