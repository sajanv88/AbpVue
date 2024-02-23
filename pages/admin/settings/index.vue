<script setup lang="ts">
import Card from "~/components/shared/Card.vue";
import Emailing from "~/components/admin/settings/Emailing.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const selectedTab = ref<"emailing" | "features">("emailing");
</script>

<template>
  <main>
    <section>
      <Card>
        <section class="md:grid md:gap-5 md:grid-cols-12">
          <div class="col-span-3">
            <ul
              class="py-3 w-full flex items-center md:block dark:text-white text-gray-800 text-md"
            >
              <li @click="selectedTab = 'emailing'" class="w-full border-b">
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
              <li @click="selectedTab = 'features'" class="w-full">
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
            </div>
          </div>
        </section>
      </Card>
    </section>
  </main>
</template>

<style scoped></style>
