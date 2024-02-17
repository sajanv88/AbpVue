<script setup lang="ts">
import { useProfile } from "~/store/state";
import type { Volo_Abp_Account_UpdateProfileDto } from "~/services/proxy/src";

const profileStore = useProfile();

const processing = ref(false);
const onSubmitEvent = async (e: SubmitEvent) => {
  processing.value = true;
  e.stopImmediatePropagation();
  e.preventDefault();
  const formElem = e.target as HTMLFormElement;
  const payload = new FormData(formElem);
  const data: Volo_Abp_Account_UpdateProfileDto = Object.fromEntries(
    payload.entries(),
  );
  await profileStore.updateProfile(data);
  processing.value = false;
};
</script>

<template>
  <section>
    <h1
      class="text-3xl font-semibold text-gray-800 dark:text-white pb-5 border-b"
    >
      Personal Info
    </h1>
    <form @submit="onSubmitEvent" class="mt-5">
      <div class="grid gap-2 grid-cols-12 space-y-3">
        <div class="col-span-12">
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >User name *</label
          >
          <input
            type="text"
            id="username"
            name="userName"
            :value="profileStore?.userName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="col-span-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            :value="profileStore?.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="col-span-6 mb-5">
          <label
            for="surname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Surname</label
          >
          <input
            type="text"
            id="surname"
            name="surname"
            :value="profileStore?.surname"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="col-span-12">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email *</label
          >
          <input
            type="email"
            id="email"
            name="email"
            :value="profileStore?.email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="col-span-12">
          <label
            for="phoneNumber"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone number</label
          >
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            :value="profileStore?.phoneNumber"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="mt-4">
        <span v-if="processing" class="text-gray-500 dark:text-white"
          >Saving...</span
        >
        <button
          v-if="!processing"
          type="submit"
          class="inline-flex items-center px-8 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped></style>
