<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";

interface IAccordionProps {
  id: string;
  title: string;
  showArrow: boolean;
  icon: string;
  renderAs: string;
  link: string;
  selected: boolean;
}
defineProps<IAccordionProps>();
const onAccordingClick = (id: string) => {
  const slot = document.querySelector(`[data-slot="slot-${id}"]`);
  const icon = document.querySelector(`[data-accordion-icon="icon-${id}"]`);

  if (!slot || !icon) return;
  icon.classList.toggle("rotate-180");
  slot.classList.toggle("hidden");
};
</script>

<template>
  <div class="mt-1 mb-1">
    <div class="flex w-full">
      <span class="flex flex-col w-full" :key="renderAs">
        <span class="block">
          <button
            v-if="renderAs == 'button'"
            :class="selected ? 'bg-gray-300 dark:bg-gray-700' : ''"
            class="block flex items-center w-full p-3 relative z-0 after:absolute after:-z-0 after:w-full after:h-full after:top-0 after:left-0 hover:after:bg-gray-800/20"
            @click="() => onAccordingClick(id as string)"
          >
            <span
              :data-accordion-target="`#${id}`"
              aria-expanded="true"
              class="flex w-full items-center space-x-2"
            >
              <Icon
                classname=" text-gray-800 dark:text-white"
                :icon="icon"
                v-if="icon"
              />
              <span class="block text-gray-800 dark:text-white truncate">
                {{ title }}
              </span>
            </span>
            <span v-if="showArrow">
              <svg
                :data-accordion-icon="`icon-${id}`"
                class="w-3 h-3 shrink-0 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </span>
          </button>
          <NuxtLink
            v-else-if="renderAs == 'link'"
            :to="link"
            activeClass="bg-gray-300 dark:bg-gray-700"
            class="flex w-full items-center space-x-2 p-3 relative z-0 after:absolute after:-z-0 after:w-full after:h-full after:top-0 after:left-0 hover:after:bg-gray-800/20"
          >
            <Icon
              classname="text-gray-800 dark:text-white"
              :icon="icon"
              v-if="icon"
            />
            <span class="block text-gray-800 dark:text-white truncate">
              {{ title }}
            </span>
          </NuxtLink>
        </span>
        <span class="hidden pl-7" :data-slot="`slot-${id}`">
          <slot />
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
