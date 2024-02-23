<script setup lang="ts">
import Card from "~/components/shared/Card.vue";
import Emailing from "~/components/admin/settings/Emailing.vue";
import ManageFeatures from "~/components/admin/settings/ManageFeatures.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const selectedTab = ref<"emailing" | "features">("emailing");
const showManageFeaturesDialog = ref<boolean>(false);
</script>

<template>
  <main>
    <Teleport to="body">
      <ManageFeatures
        :open="showManageFeaturesDialog"
        v-if="showManageFeaturesDialog"
        @dialog-close="showManageFeaturesDialog = false"
      />
    </Teleport>
    <section>
      <Card>
        <section class="md:grid md:gap-5 md:grid-cols-12">
          <div class="col-span-3">
            <ul
              class="py-3 w-full flex items-center md:block dark:text-white text-gray-800 text-md"
            >
              <li
                @click="selectedTab = 'emailing'"
                class="w-full"
                :class="selectedTab === 'emailing' ? 'border-b' : ''"
              >
                <a
                  class="inline-flex truncate w-full p-5 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:hover:bg-gray-600 dark:focus:ring-blue-800"
                  href="javascript:void(0)"
                  :class="
                    selectedTab == 'personal'
                      ? 'border-b bg-gray-400 text-white'
                      : ''
                  "
                >
                  Emailing</a
                >
              </li>
              <li
                @click="selectedTab = 'features'"
                class="w-full"
                :class="selectedTab === 'features' ? 'border-b' : ''"
              >
                <a
                  class="inline-flex truncate w-full p-5 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:hover:bg-gray-600 dark:focus:ring-blue-800"
                  href="javascript:void(0)"
                  :class="
                    selectedTab == 'changePassword'
                      ? 'border-b border-b bg-gray-400 text-white'
                      : ''
                  "
                >
                  Feature Management
                </a>
              </li>
            </ul>
          </div>
          <div class="col-span-9">
            <div class="pt-5">
              <Emailing v-if="selectedTab === 'emailing'" />
              <div v-if="selectedTab === 'features'" class="space-y-2">
                <p class="text-sm text-gray-700 dark:text-white">
                  You can manage the host side features by clicking the
                  following button.
                </p>
                <button
                  type="button"
                  @click="showManageFeaturesDialog = true"
                  class="w-full md:w-auto flex justify-center items-center px-4 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Manage host features
                </button>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </section>
  </main>
</template>

<style scoped></style>
