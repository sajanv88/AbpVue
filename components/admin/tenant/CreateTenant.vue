<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import { useTenants } from "~/store/state";
import type {
  Volo_Abp_TenantManagement_TenantCreateDto,
  Volo_Abp_TenantManagement_TenantUpdateDto,
} from "~/services/proxy/src";
import { storeToRefs } from "pinia";
import Alert from "~/components/shared/Alert.vue";
import { Input } from "~/abp/ui/input";
interface ICreateTenantProps {
  edit?: boolean;
  open: boolean;
}
const props = defineProps<ICreateTenantProps>();
const tenantStore = useTenants();
const { create } = storeToRefs(tenantStore);
const processing = ref(false);
const emit = defineEmits(["dialogClose"]);

const formInputField = ref({
  name: "",
  adminEmailAddress: "",
  adminPassword: "",
});
const createNewTenant = async function (e: SubmitEvent) {
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
    const payload: Volo_Abp_TenantManagement_TenantCreateDto = {
      name: formValue.name as string,
      adminEmailAddress: formValue.adminEmailAddress as string,
      adminPassword: formValue.adminPassword as string,
    };
    const success = await tenantStore.createTenant(payload);
    processing.value = false;
    if (success) {
      emit("dialogClose");
    }
  } else {
    const payload: Volo_Abp_TenantManagement_TenantUpdateDto = {
      name: formValue.name as string,
    };
    const success = await tenantStore.updateTenant(payload);
    processing.value = false;
    if (success) {
      emit("dialogClose");
    }
  }
};

const dialogTitle = props.edit ? "Edit Tenant" : "New Tenant";
</script>

<template>
  <Dialog
    id="tenants"
    :title="dialogTitle"
    :open="open"
    @close="$emit('dialogClose')"
  >
    <Alert v-if="create.error" type="error" :message="create.error.message" />
    <form class="p-4 md:p-5" @submit="createNewTenant">
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tenant name *</label
          >
          <Input
            type="text"
            name="name"
            id="name"
            @input="formInputField.name = $event.target.value"
            :default-value="tenantStore.selectedTenant.data?.name"
            class="p-6"
            required
          />
        </div>
        <!-- Abp basic version only allows you to edit name and host name. -->
        <div class="col-span-2" v-if="!edit">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tenant admin's email address *</label
          >
          <Input
            type="email"
            name="adminEmailAddress"
            id="email"
            @input="formInputField.adminEmailAddress = $event.target.value"
            required
          />
        </div>
        <div class="col-span-2" v-if="!edit">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tenant admin's password *</label
          >
          <Input
            type="password"
            name="adminPassword"
            @input="formInputField.adminPassword = $event.target.value"
            id="password"
            placeholder=""
            required
          />
        </div>
      </div>
      <footer class="flex items-center justify-end space-x-2">
        <span
          v-if="tenantStore.create.status"
          class="text-gray-700 dark:text-white"
          >Creating a New Tenant...</span
        >
        <span
          v-if="tenantStore.updateTenant.status"
          class="text-gray-700 dark:text-white"
          >Updating Tenant...</span
        >
        <Button
          v-if="!processing"
          id="tenantCancelBtn"
          type="button"
          @click="$emit('dialogClose')"
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
