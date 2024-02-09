<script setup lang="ts">
import type { INavigation } from "~/types/navigation";
import Accordion from "~/components/shared/Accordion.vue";
defineProps({
  navigations: Array<INavigation>,
});
</script>

<template>
  <section role="navigation">
    <div class="flex flex-col w-full p-1 pt-5">
      <h1
        class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white"
      >
        AbpVue Template
      </h1>
      <slot name="filter-menu" />
      <ul v-for="nav in navigations" :key="nav.id" class="space-y-5">
        <li :id="nav.id">
          <Accordion
            :id="nav.id"
            :show-arrow="nav.children?.length > 0"
            :link="nav.link"
            :title="nav.title"
            :icon="nav.icon"
            :render-as="nav.link ? 'link' : 'button'"
          >
            <ul v-if="nav.children?.length > 0">
              <li v-for="c in nav.children" :key="c.id" :id="c.id">
                <Accordion
                  :id="c.id"
                  :show-arrow="c.children?.length > 0"
                  :link="c.link"
                  :title="c.title"
                  :icon="c.icon"
                  :render-as="c.link ? 'link' : 'button'"
                >
                  <ul v-if="c.children?.length > 0">
                    <li v-for="d in c.children" :key="d.id">
                      <Accordion
                        :id="c.id"
                        :show-arrow="d.children?.length > 0"
                        :link="d.link"
                        :title="d.title"
                        :icon="d.icon"
                        :render-as="d.link ? 'link' : 'button'"
                      />
                    </li>
                  </ul>
                </Accordion>
              </li>
            </ul>
          </Accordion>
        </li>
      </ul>
      <AdminHeader class="md:hidden mt-10" position="justify-center flex-col" />
    </div>
  </section>
</template>

<style scoped></style>
