<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import Alert from "~/components/shared/Alert.vue";
import type { Volo_Abp_SettingManagement_SendTestEmailInput } from "~/services/proxy/src";
import { useEmailing } from "~/store/state";
import { Input } from "~/abp/ui/input";

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
    <form @submit="onSubmitForm">
      <section class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
            for="senderEmailAddress"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Sender email address *</label
          >
          <Input
            type="email"
            name="senderEmailAddress"
            id="senderEmailAddress"
            @input="inputFieldRef.senderEmailAddress = $event.target.value"
            :default-value="inputFieldRef.senderEmailAddress"
            class="p-6 pl-3"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="targetEmailAddress"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Target email address *</label
          >
          <Input
            type="email"
            name="targetEmailAddress"
            id="targetEmailAddress"
            @input="inputFieldRef.targetEmailAddress = $event.target.value"
            :default-value="inputFieldRef.targetEmailAddress"
            class="p-6 pl-3"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="senderEmailAddress"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Subject *</label
          >
          <Input
            type="text"
            name="subject"
            id="subject"
            @input="inputFieldRef.subject = $event.target.value"
            :default-value="inputFieldRef.subject"
            class="p-6 pl-3"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="body"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Body</label
          >
          <Input
            type="text"
            name="body"
            id="body"
            @input="inputFieldRef.body = $event.target.value"
            :default-value="inputFieldRef.body"
            class="p-6 pl-3"
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
        <Button
          v-if="!emailStore.testEmail.status"
          type="button"
          @click="onCloseDialog"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button v-if="!emailStore.testEmail.status" type="submit">
          Send
        </Button>
      </footer>
    </form>
  </Dialog>
</template>

<style scoped></style>
