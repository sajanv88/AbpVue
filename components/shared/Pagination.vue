<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { getPages } from "~/utils";
interface IPaginationProps {
  totalPage: number;
  currentPage: number;
}
const props = defineProps<IPaginationProps>();
const numOfPages = getPages(props.totalPage, props.currentPage);
const localCurrentPage =
  props.currentPage == 0 || props.currentPage == 1 ? 1 : props.currentPage;
const lastPage = localCurrentPage >= props.totalPage;
</script>

<template>
  <nav
    class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
    aria-label="Table navigation"
  >
    <span
      class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >Showing
      <span class="font-semibold text-gray-900 dark:text-white"
        >{{ localCurrentPage }}-{{ props.totalPage }}</span
      >
      of
      <span class="font-semibold text-gray-900 dark:text-white">
        {{ props.totalPage }}</span
      >
    </span>
    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <button
          @click="$emit('onPreviousPage', props.currentPage - 1)"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 dark:border-gray-700"
          :class="
            localCurrentPage == 1
              ? 'cursor-not-allowed text-gray-800 bg-gray-400 dark:text-gray-800 dark:bg-gray-100'
              : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          "
          :disabled="localCurrentPage == 1"
        >
          Previous
        </button>
      </li>
      <li v-for="page of numOfPages" :key="page">
        <span
          v-if="page == 'SPACER'"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        >
          <Icon icon="dots" />
        </span>
        <button
          v-else
          @click="$emit('onSelectedPage', page)"
          class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          :class="
            localCurrentPage == page
              ? 'cursor-not-allowed text-gray-800 bg-gray-400 dark:text-gray-800 dark:bg-gray-100'
              : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
          "
          :disabled="localCurrentPage == page"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          @click="$emit('onNextPage', props.currentPage + 1)"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:border-gray-700"
          :class="
            lastPage
              ? 'cursor-not-allowed text-gray-800 bg-gray-400 dark:text-gray-800 dark:bg-gray-100'
              : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          "
          :disabled="lastPage"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
