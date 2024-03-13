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
    class="flex items-center flex-column pt-10 pb-10 justify-center flex-wrap md:pt-4 md:pb-0 md:flex-row md:justify-between"
    aria-label="Table navigation"
  >
    <span
      class="block text-center md:text-left text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 w-full md:inline md:w-auto"
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
        <Button
          @click="$emit('onPreviousPage', props.currentPage - 1)"
          variant="link"
          :disabled="localCurrentPage == 1"
          size="sm"
        >
          Previous
        </Button>
      </li>
      <li v-for="page of numOfPages" :key="page">
        <span
          v-if="page == 'SPACER'"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        >
          <Icon icon="dots" />
        </span>
        <Button
          v-else
          @click="$emit('onSelectedPage', page)"
          variant="link"
          :disabled="localCurrentPage == page"
        >
          {{ page }}
        </Button>
      </li>

      <li>
        <Button
          @click="$emit('onNextPage', props.currentPage + 1)"
          variant="link"
          size="sm"
          :disabled="lastPage"
        >
          Next
        </Button>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
