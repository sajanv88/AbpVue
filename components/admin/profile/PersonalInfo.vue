<script setup lang="ts">
import { useProfile } from "~/store/state";
import type { Volo_Abp_Account_UpdateProfileDto } from "~/services/proxy/src";
import { Input } from "~/abp/ui/input";

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
          <Input
            type="text"
            id="username"
            name="userName"
            :default-value="profileStore?.userName"
            class="p-6 pl-3"
            required
          />
        </div>
        <div class="col-span-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <Input
            type="text"
            id="name"
            name="name"
            :default-value="profileStore?.name"
            class="p-6 pl-3"
          />
        </div>
        <div class="col-span-6 mb-5">
          <label
            for="surname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Surname</label
          >
          <Input
            type="text"
            id="surname"
            name="surname"
            :default-value="profileStore?.surname"
            class="p-6 pl-3"
          />
        </div>
        <div class="col-span-12">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email *</label
          >
          <Input
            type="email"
            id="email"
            name="email"
            :default-value="profileStore?.email"
            class="p-6 pl-3"
            required
          />
        </div>
        <div class="col-span-12">
          <label
            for="phoneNumber"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone number</label
          >
          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            :default-value="profileStore?.phoneNumber"
            class="p-6 pl-3"
          />
        </div>
      </div>
      <div class="mt-4">
        <span v-if="processing" class="text-gray-500 dark:text-white"
          >Saving...</span
        >
        <Button v-if="!processing" type="submit"> Save </Button>
      </div>
    </form>
  </section>
</template>

<style scoped></style>
