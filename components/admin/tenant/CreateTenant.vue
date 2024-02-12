<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
import { getAbpServiceProxy, useTenants } from "~/store/state";
interface ICreateTenantProps {
  edit?: boolean;
  open: boolean;
}
defineProps<ICreateTenantProps>();
const tenantStore = useTenants();
const creating = ref(false);

const createNewTenant = async (e: SubmitEvent) => {
  e.preventDefault();
  const formElem = e.target as HTMLFormElement;

  const formData = new FormData(formElem);
  const payload: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    payload[key] = value;
  }
  const url = `${getAbpServiceProxy()}/multi-tenancy/tenants`;
  const { pending, error } = await useFetch(url, {
    method: "POST",
    body: payload,
  });
  creating.value = pending.value;
  if (error.value) {
    console.log(error.value, "error");
    return;
  }
  await tenantStore.fetch();
  document.getElementById("tenantCancelBtn")?.click();
};
</script>

<template>
  <Dialog
    id="tenants"
    title="New Tenant"
    :open="open"
    @close="$emit('dialogClose')"
  >
    <form class="p-4 md:p-5" @submit="createNewTenant">
      <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tenant name *</label
          >
          <input
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tenant admin's email address *</label
          >
          <input
            type="email"
            name="adminEmailAddress"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div class="col-span-2">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tenant admin's password *</label
          >
          <input
            type="password"
            name="adminPassword"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder=""
            required
          />
        </div>
      </div>
      <footer class="flex items-center justify-end space-x-2">
        <button
          id="tenantCancelBtn"
          @click="$emit('dialogClose')"
          class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Cancel
        </button>
        <button
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
