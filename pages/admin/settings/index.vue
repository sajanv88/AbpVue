<script setup lang="ts">
import { Card } from "@/abp/ui/card";
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
        <CardContent>
          <section class="md:grid md:gap-5 md:grid-cols-12">
            <div class="col-span-3">
              <ul
                class="py-3 w-full flex items-center md:block dark:text-white text-gray-800 text-md"
              >
                <li @click="selectedTab = 'emailing'" class="w-full">
                  <Button
                    :variant="selectedTab == 'emailing' ? 'default' : 'link'"
                  >
                    Emailing</Button
                  >
                </li>
                <li @click="selectedTab = 'features'" class="w-full">
                  <Button
                    :variant="selectedTab == 'features' ? 'default' : 'link'"
                  >
                    Feature Management
                  </Button>
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
                  <Button
                    type="button"
                    @click="showManageFeaturesDialog = true"
                  >
                    Manage host features
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </section>
  </main>
</template>

<style scoped></style>
