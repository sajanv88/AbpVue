<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import IconButton from "~/components/shared/IconButton.vue";

interface DialogProps {
  id: string;
  title: string;
  open: boolean;
}
defineProps<DialogProps>();
</script>

<template>
  <section
    :id="id"
    tabindex="-1"
    :aria-hidden="open"
    class="overflow-y-auto transition ease-in overflow-x-hidden bg-gray-400/90 dark:bg-gray-800/90 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-svh"
    :class="open ? 'block' : 'hidden'"
  >
    <section class="relative p-4 w-full max-w-2xl max-h-full">
      <section class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <header
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <IconButton
            @click="$emit('close', id)"
            classname="bg-transparent dark:bg-transparent border-none"
          >
            <Icon icon="cross" :w="16" :h="16" />
          </IconButton>
        </header>
        <main>
          <slot />
        </main>
      </section>
    </section>
  </section>
</template>

<style scoped></style>
