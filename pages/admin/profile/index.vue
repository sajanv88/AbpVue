<script setup lang="ts">
import Card from "~/components/shared/Card.vue";
import PersonalInfo from "~/components/admin/profile/PersonalInfo.vue";
import ChangePassword from "~/components/admin/profile/ChangePassword.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const selectedTab = ref<"personal" | "changePassword">("personal");
</script>

<template>
  <Card>
    <section class="md:grid md:gap-5 md:grid-cols-12">
      <div class="col-span-3">
        <ul
          class="py-3 w-full flex items-center md:block dark:text-white text-gray-800 text-md"
        >
          <li @click="selectedTab = 'personal'" class="w-full">
            <a
              class="inline-flex truncate justify-center w-full p-5 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center dark:hover:bg-gray-600 dark:focus:ring-gray-800"
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
              class="inline-flex truncate justify-center w-full p-5 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center dark:hover:bg-gray-600 dark:focus:ring-gray-800"
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
          <h1
            class="text-3xl font-semibold text-gray-800 dark:text-white pb-5 border-b"
          >
            {{
              selectedTab == "personal" ? "Personal Info" : "Change Password"
            }}
          </h1>

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
