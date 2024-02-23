<script setup lang="ts">
import Navigation from "~/components/admin/Navigation.vue";
import type { INavigation } from "~/types/navigation";

import { useAbpConfiguration, useNavigation, useTokenSet } from "~/store/state";
import ToastContainer from "~/components/shared/ToastContainer.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";

useHead({
  bodyAttrs: {
    class: "bg-gray-200 dark:bg-gray-800",
  },
});
const token = useTokenSet();
const abpConfig = useAbpConfiguration();
const navStore = useNavigation();

const isTenantId = !!abpConfig.config?.currentUser?.tenantId;

const navList: Array<INavigation> = [
  {
    id: "home",
    title: "Home",
    icon: "home",
    link: "/admin",
  },
  {
    id: "saas",
    title: "Saas",
    icon: "users",
    link: "",

    children: [
      {
        id: "tenants",
        title: "Tenants",
        link: "/admin/saas/tenants",
      },
    ],
  },
  {
    id: "administration",
    title: "Administration",
    icon: "configure",
    link: "",

    children: [
      {
        id: "identity",
        title: "Identity Management",
        link: "",
        icon: "identity",

        children: [
          {
            id: "roles",
            title: "Roles",
            link: "/admin/identity/roles",
          },
          {
            id: "users",
            title: "Users",
            link: "/admin/identity/users",
          },
        ],
      },
      {
        id: "settings",
        title: "Settings",
        link: "/admin/settings",
        icon: "settings",
      },
    ],
  },
];

await callOnce(async () => {
  await token.fetch();
});

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
</script>

<template>
  <SpeedInsights />
  <main class="relative bg-gray-200 dark:bg-gray-800">
    <section class="h-svh overflow-y-auto">
      <section class="relative min-h-svh">
        <section
          :class="
            navStore.isSideNavbarOpen
              ? 'translate-x-0 w-full'
              : 'translate-x-[-100rem]'
          "
          class="md:w-[17rem] z-20 bg-gray-200 dark:bg-gray-800 transition-all md:translate-x-0 fixed top-0 h-svh shadow-lg"
        >
          <Navigation :navigations="navigations" />
        </section>
        <section class="md:ml-[4.5rem] lg:ml-[17rem] p-3 lg:p5">
          <div class="dark:border-gray-300 shadow-md abp-vue-header-container">
            <AdminHeader />
          </div>
          <div class="min-h-svh pt-5">
            <slot />
          </div>
        </section>
      </section>
    </section>

    <Teleport to="body">
      <ToastContainer />
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
