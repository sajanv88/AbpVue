<script setup lang="ts">
import Card from "~/components/shared/Card.vue";
import PersonalInfo from "~/components/admin/profile/PersonalInfo.vue";
import ChangePassword from "~/components/admin/profile/ChangePassword.vue";
import Alert from "~/components/shared/Alert.vue";
import { useProfile } from "~/store/profileStore";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const profileStore = useProfile();
const selectedTab = ref<"personal" | "changePassword">("personal");
</script>

<template>
  <Alert
    type="warning"
    :message="profileStore.updatePassword?.error?.message"
    v-if="profileStore.updatePassword.error"
    dismissible
    @dismissed="profileStore.resetError()"
  />
  <Alert
    type="error"
    :message="profileStore?.error?.message"
    v-if="profileStore?.error"
    dismissible
    @dismissed="profileStore.resetError()"
  />
  <Card>
    <section class="md:grid md:gap-5 md:grid-cols-12">
      <div class="col-span-3">
        <ul
          class="py-3 w-full flex items-center md:block dark:text-white text-gray-800 text-md"
        >
          <li @click="selectedTab = 'personal'" class="w-full">
            <a
              class="inline-flex truncate justify-center w-full p-5 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:hover:bg-gray-600 dark:focus:ring-blue-800"
              href="javascript:void(0)"
              :class="
                selectedTab == 'personal'
                  ? 'border-b bg-gray-400 text-white'
                  : ''
              "
            >
              Personal info</a
            >
          </li>
          <li @click="selectedTab = 'changePassword'" class="w-full">
            <a
              class="inline-flex truncate justify-center w-full p-5 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:hover:bg-gray-600 dark:focus:ring-blue-800"
              href="javascript:void(0)"
              :class="
                selectedTab == 'changePassword'
                  ? 'border-b border-b bg-gray-400 text-white'
                  : ''
              "
            >
              Change password
            </a>
          </li>
        </ul>
      </div>
      <div class="col-span-9">
        <div class="pt-5">
          <PersonalInfo v-if="selectedTab == 'personal'" :key="selectedTab" />
          <ChangePassword
            v-if="selectedTab == 'changePassword'"
            :key="selectedTab"
          />
        </div>
      </div>
    </section>
  </Card>
</template>

<style scoped></style>
