<script setup lang="ts">
import type { INavigation } from "~/types/navigation";
import Accordion from "~/components/shared/Accordion.vue";
import { useAbpConfiguration } from "~/store/state";
interface INavigationProps {
  navigations: Array<INavigation>;
}
defineProps<INavigationProps>();
const { config } = useAbpConfiguration();
const currentUser = config?.currentUser;
</script>

<template>
  <section role="navigation" id="nav">
    <div class="flex flex-col w-full p-1 pt-5">
      <h1
        class="capitalize text-lg dark:text-white font-extrabold text-center"
        v-if="currentUser"
      >
        Hey {{ currentUser.name }}!
      </h1>
      <slot name="filter-menu" />
      <div class="mt-10">
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
      </div>
    </div>
  </section>
</template>

<style scoped></style>
