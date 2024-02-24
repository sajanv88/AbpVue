<script setup lang="ts">
import { useUsers } from "~/store/state";
import { useUserById } from "#imports";
import type {
  Volo_Abp_Identity_IdentityUserCreateDto,
  Volo_Abp_Identity_IdentityUserDto,
} from "~/services/proxy/src";
import Checkbox from "~/components/shared/Checkbox.vue";
import Icon from "~/components/shared/Icon.vue";

interface IUserInformation {
  edit?: boolean;
}
const props = defineProps<IUserInformation>();
const userStore = useUsers();

const inputRef = ref<
  Volo_Abp_Identity_IdentityUserCreateDto & { passwordViewer: boolean }
>({
  userName: "",
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
  isActive: false,
  lockoutEnabled: false,
  password: "",
  passwordViewer: true,
});

const existingUser = (await useUserById(
  userStore.selectedUserId,
)) as Volo_Abp_Identity_IdentityUserDto;

watch(inputRef.value, () => {
  userStore.setUserInputData(inputRef.value);
});

if (props.edit && existingUser) {
  inputRef.value.userName = existingUser.userName!;
  inputRef.value.surname = existingUser.surname!;
  inputRef.value.name = existingUser.name!;
  inputRef.value.email = existingUser.email!;
  inputRef.value.phoneNumber = existingUser.phoneNumber!;
  inputRef.value.isActive = existingUser.isActive!;
  inputRef.value.lockoutEnabled = existingUser.lockoutEnabled!;
}
</script>

<template>
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
        @input="inputRef.userName = $event.target.value"
        :value="existingUser?.userName ?? inputRef.userName"
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
        @input="inputRef.name = $event.target.value"
        :value="existingUser?.name ?? inputRef.name"
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
        @input="inputRef.surname = $event.target.value"
        :value="existingUser?.surname ?? inputRef.surname"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="col-span-12">
      <label
        for="currentPassword"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password {{ edit ? "" : "*" }}</label
      >
      <div class="flex items-center">
        <input
          id="currentPassword"
          :type="!inputRef.passwordViewer ? 'text' : 'password'"
          name="password"
          @input="inputRef.password = $event.target.value"
          :value="inputRef.password"
          :autocomplete="true"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :required="!edit"
        />
        <button
          type="button"
          @click="() => (inputRef.passwordViewer = !inputRef.passwordViewer)"
          class="p-2 text-gray-900 dark:text-white focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 focus:border-blue-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Icon :icon="!inputRef.passwordViewer ? 'eye' : 'eye-slash'" />
          <span class="sr-only">Eye</span>
        </button>
      </div>
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
        @input="inputRef.email = $event.target.value"
        :value="existingUser?.email ?? inputRef.email"
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
        @input="inputRef.phoneNumber = $event.target.value"
        :value="existingUser?.phoneNumber ?? inputRef.phoneNumber"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="col-span-12">
      <Checkbox
        id="isActive"
        name="isActive"
        :checked="
          existingUser?.isActive?.toString() ?? inputRef.isActive.toString()
        "
        label="Active"
        @on-change-event="(checked) => (inputRef.isActive = checked)"
      />
    </div>
    <div class="col-span-12">
      <Checkbox
        id="lockoutEnabled"
        name="lockoutEnabled"
        :checked="
          existingUser?.lockoutEnabled?.toString() ??
          inputRef.lockoutEnabled?.toString()
        "
        label="Lock account after failed login attempts"
        @on-change-event="(checked) => (inputRef.lockoutEnabled = checked)"
      />
    </div>
  </div>
</template>

<style scoped></style>
