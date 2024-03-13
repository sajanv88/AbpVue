<script setup lang="ts">
import Checkbox from "~/components/shared/Checkbox.vue";
import Alert from "~/components/shared/Alert.vue";
import { useEmailing } from "~/store/state";
import type { Volo_Abp_SettingManagement_EmailSettingsDto } from "~/services/proxy/src";
import TestEmail from "~/components/admin/settings/TestEmail.vue";
import { Input } from "~/abp/ui/input";

const processing = ref<boolean>(false);
const toggleCredentials = ref<boolean>(false);
const showTestEmailDialog = ref<boolean>(false);
const emailStore = useEmailing();
await emailStore.fetch();
toggleCredentials.value = emailStore.data?.smtpUseDefaultCredentials ?? false;
const inputFieldRef = ref<Volo_Abp_SettingManagement_EmailSettingsDto>({
  defaultFromAddress: "",
  defaultFromDisplayName: "",
  smtpHost: "",
  smtpPort: 0,
  smtpEnableSsl: false,
  smtpUseDefaultCredentials: false,
  smtpDomain: "",
  smtpUserName: "",
  smtpPassword: "",
});
const onChangeEvent = (checked: boolean) => {
  console.log(checked, "checked");
  toggleCredentials.value = checked;
};
const onSubmitEvent = async (e: SubmitEvent) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  const formElem = e.target as HTMLFormElement;
  const formData = new FormData(formElem);
  const payload = Object.fromEntries(formData.entries());

  await emailStore.update({
    defaultFromAddress: payload.defaultFromAddress as string,
    defaultFromDisplayName: payload.defaultFromDisplayName as string,
    smtpHost: payload.smtpHost as string,
    smtpPort: parseInt(payload.smtpPort as string),
    smtpEnableSsl: payload.smtpEnableSsl === "true",
    smtpUseDefaultCredentials: payload.smtpUseDefaultCredentials === "true",
    smtpDomain: payload.smtpDomain as string,
    smtpUserName: payload.smtpUserName as string,
    smtpPassword: payload.smtpPassword as string,
  });
};
</script>

<template>
  <section>
    <Teleport to="body">
      <TestEmail
        v-if="showTestEmailDialog"
        :open="showTestEmailDialog"
        @dialog-close="showTestEmailDialog = false"
      />
    </Teleport>
    <Alert
      v-if="emailStore.error"
      type="error"
      :message="emailStore.error.message"
    />

    <form @submit="onSubmitEvent" class="mt-3">
      <div class="grid gap-2 grid-cols-12 space-y-3">
        <div class="col-span-12">
          <label
            for="defaultFromDisplayName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Default from display name *</label
          >
          <Input
            type="text"
            id="defaultFromDisplayName"
            :default-value="
              emailStore.data?.defaultFromDisplayName ??
              inputFieldRef.defaultFromDisplayName
            "
            @input="inputFieldRef.defaultFromDisplayName = $event.target.value"
            name="defaultFromDisplayName"
            class="p-6 pl-3"
            required
          />
        </div>

        <div class="col-span-12">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Default from address *</label
          >
          <Input
            type="email"
            id="defaultFromAddress"
            name="defaultFromAddress"
            :default-value="
              emailStore.data?.defaultFromAddress ??
              inputFieldRef.defaultFromAddress
            "
            class="p-6 pl-3"
            @input="inputFieldRef.defaultFromAddress = $event.target.value"
            required
          />
        </div>
        <div class="col-span-12">
          <label
            for="smtpHost"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Host</label
          >
          <Input
            type="text"
            id="smtpHost"
            name="smtpHost"
            :default-value="emailStore.data?.smtpHost ?? inputFieldRef.smtpHost"
            @input="inputFieldRef.smtpHost = $event.target.value"
            class="p-6 pl-3"
          />
        </div>
        <div class="col-span-12">
          <label
            for="smtpPort"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Port</label
          >
          <Input
            type="number"
            id="smtpPort"
            name="smtpPort"
            :default-value="emailStore.data?.smtpPort ?? inputFieldRef.smtpPort"
            @input="inputFieldRef.smtpPort = $event.target.value"
            class="p-6 pl-3"
          />
        </div>
        <div class="col-span-12">
          <Checkbox
            id="smtpEnableSsl"
            name="smtpEnableSsl"
            :checked="
              emailStore.data?.smtpEnableSsl?.toString() ??
              inputFieldRef.smtpEnableSsl?.toString() ??
              'false'
            "
            label="Enable SSL"
          />
        </div>
        <div class="col-span-12">
          <Checkbox
            id="smtpUseDefaultCredentials"
            name="smtpUseDefaultCredentials"
            :checked="
              emailStore.data?.smtpUseDefaultCredentials.toString() ??
              inputFieldRef.smtpUseDefaultCredentials.toString() ??
              'false'
            "
            label="Use default credentials"
            @on-change-event="onChangeEvent"
          />
        </div>
        <div class="col-span-12 space-y-2" v-show="toggleCredentials">
          <div>
            <label
              for="smtpDomain"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Domain</label
            >
            <Input
              type="text"
              id="smtpDomain"
              name="smtpDomain"
              :default-value="
                emailStore.data?.smtpDomain ?? inputFieldRef.smtpDomain
              "
              @input="inputFieldRef.smtpDomain = $event.target.value"
              class="p-6 pl-3"
            />
          </div>
          <div>
            <label
              for="smtpDomain"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >User name</label
            >
            <Input
              type="text"
              id="smtpUserName"
              name="smtpUserName"
              :default-value="
                emailStore.data?.smtpUserName ?? inputFieldRef.smtpUserName
              "
              @input="inputFieldRef.smtpUserName = $event.target.value"
              class="p-6 pl-3"
            />
          </div>
          <div>
            <label
              for="smtpPassword"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <Input
              type="text"
              id="smtpPassword"
              name="smtpPassword"
              :default-value="
                emailStore.data?.smtpPassword ?? inputFieldRef.smtpPassword
              "
              @input="inputFieldRef.smtpPassword = $event.target.value"
              class="p-6 pl-3"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <span v-if="processing" class="text-gray-500 dark:text-white"
          >Saving...</span
        >
        <div class="flex items-center justify-end space-x-2">
          <Button
            v-if="!processing"
            type="button"
            @click="showTestEmailDialog = true"
            variant="secondary"
          >
            Send test email
          </Button>
          <Button v-if="!processing" type="submit"> Save </Button>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped></style>
