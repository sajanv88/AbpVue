<script setup lang="ts">
import Navigation from "~/components/admin/Navigation.vue";
import type { INavigation } from "~/types/navigation";
import IconButton from "~/components/shared/IconButton.vue";
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration, useTokenSet } from "~/store/state";
import ToastContainer from "~/components/shared/ToastContainer.vue";

useHead({
  bodyAttrs: {
    class: "bg-gray-200 dark:bg-gray-800",
  },
});
const navigations: Array<INavigation> = [
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

const token = useTokenSet();
const abpConfig = useAbpConfiguration();

await callOnce(async () => {
  await token.fetch();
});

await callOnce(async () => {
  await abpConfig.fetch();
});

const toggleNav = ref(false);
const onToggleNavEvent = () => {
  toggleNav.value = !toggleNav.value;
};
</script>

<template>
  <main class="relative bg-gray-200 dark:bg-gray-800">
    <section class="h-svh overflow-y-auto">
      <section class="relative min-h-svh">
        <section
          :class="toggleNav ? 'translate-x-0 w-full' : 'translate-x-[-100rem]'"
          class="md:w-[17rem] z-20 bg-gray-200 dark:bg-gray-800 transition-all md:translate-x-0 fixed top-0 h-svh shadow-lg"
        >
          <Navigation
            :navigations="navigations"
            @toggle-nav="onToggleNavEvent"
          />
        </section>
        <section class="md:ml-[4.5rem] lg:ml-[17rem] p-3 lg:p5">
          <div class="dark:border-gray-300 shadow-md abp-vue-header-container">
            <AdminHeader @toggle-nav="onToggleNavEvent" />
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
