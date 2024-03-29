<script setup lang="ts">
import Navigation from "~/components/admin/Navigation.vue";
import Toaster from "@/abp/ui/toast/Toaster.vue";

import { useAbpConfiguration, useNavigation } from "~/store/state";

import Dialog from "~/components/shared/Dialog.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { navList } from "~/utils";

const showLogoutDialog = ref<boolean>(false);

onMounted(async () => {
  const worker = new Worker("/workers/worker.js");
  worker.addEventListener("message", (event) => {
    showLogoutDialog.value = event.data.code == 401;
  });
});

const abpConfig = useAbpConfiguration();
const navStore = useNavigation();

const isTenantId = !!abpConfig.config?.currentUser?.tenantId;

await callOnce(async () => {
  await abpConfig.fetch();
});

const navigations = computed(() => {
  return navList
    .filter((nav) => {
      // if tenantId is available, hide saas navigation. Host user can see saas navigation.
      // Read more https://docs.abp.io/en/abp/latest/Multi-Tenancy
      if (nav.id === "saas" && isTenantId) {
        return null;
      }
      return nav;
    })
    .filter(Boolean);
});

const goToAuthServer = async () => {
  window.location.href = "/api/auth/signin";
  showLogoutDialog.value = false;
};
</script>

<template>
  <SpeedInsights />
  <main class="relative">
    <Teleport to="body">
      <Dialog
        title="Session Expired"
        :open="showLogoutDialog"
        @close="goToAuthServer"
      >
        <section class="p-5">
          <p>
            Your session has expired.
            <a href="/api/auth/signin">
              <span class="text-blue-500">Click here to login</span>
            </a>
          </p>
        </section>
      </Dialog>
    </Teleport>
    <section class="h-svh overflow-y-auto">
      <section class="relative min-h-svh">
        <section
          :class="
            navStore.isSideNavbarOpen
              ? 'translate-x-0 w-full'
              : 'translate-x-[-100rem]'
          "
          class="md:w-[17rem] xl:w-[24rem] z-20 transition-all md:translate-x-0 fixed top-0 h-svh shadow-lg bg-background"
        >
          <Navigation :navigations="navigations" />
        </section>
        <section class="md:ml-[17rem] xl:ml-[24rem] p-3 lg:p5">
          <div class="abp-vue-header-container">
            <AdminHeader />
          </div>
          <div class="min-h-svh pt-5">
            <slot />
          </div>
        </section>
      </section>
    </section>

    <Teleport to="body">
      <Toaster />
    </Teleport>
  </main>
</template>

<style scoped>
.abp-vue-header-container {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
