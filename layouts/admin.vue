<script setup lang="ts">
import Navigation from "~/components/admin/Navigation.vue";
import type { INavigation } from "~/types/navigation";
import IconButton from "~/components/shared/IconButton.vue";
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration, useTokenSet } from "~/store/state";
import ToastContainer from "~/components/shared/ToastContainer.vue";

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

const onMenuClickEvent = () => {
  const nav = document.querySelector("[data-navSection='main-nav']");
  const mobileMenuBtn = document.querySelector("[data-menuBtn='mobile-menu']");
  const mobileCrossBtn = document.querySelector(
    "[data-menuBtn='mobile-cross']",
  );
  if (!nav || !mobileMenuBtn) return;
  nav.classList.toggle("translate-x-[-100rem]");
  mobileCrossBtn?.classList.toggle("hidden");
  mobileMenuBtn?.classList.toggle("hidden");
};
</script>

<template>
  <main class="relative bg-gray-200 dark:bg-gray-800">
    <div id="dialog" />
    <div class="fixed w-full z-50">
      <AdminHeader />
    </div>
    <IconButton
      class="block absolute transition top-[3rem] left-2 md:hidden"
      @click="onMenuClickEvent"
      data-menuBtn="mobile-menu"
    >
      <Icon icon="menu" />
    </IconButton>
    <section class="grid md:grid-cols-12 pt-20">
      <section
        class="absolute z-10 h-svh w-full bg-gray-200 dark:bg-gray-800 shadow-lg translate-x-[-100rem] transition-all md:translate-x-0 md:static md:col-span-4 lg:col-span-3"
        data-navSection="main-nav"
      >
        <IconButton
          class="hidden absolute right-2 transition md:hidden"
          @click="onMenuClickEvent"
          data-menuBtn="mobile-cross"
        >
          <Icon icon="cross" />
        </IconButton>
        <Navigation :navigations="navigations" />
      </section>
      <section role="main" class="md:pl-0 md:col-span-8 lg:col-span-9">
        <section
          class="md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto md:pl-5 md:pr-5 md:pb-5 md:pt-2"
        >
          <div class="md:max-h-svh md:overflow-y-auto">
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

<style scoped></style>
