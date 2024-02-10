<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Search from "~/components/shared/Search.vue";
interface IFilterContainerProps {
  slug: string;
  newBtnName: string;
  searchType: "tenants" | "roles" | "users";
  searchPlaceholder: string;
}
const props = defineProps<IFilterContainerProps>();
</script>

<template>
  <header
    class="mb-10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center mb-10">
      <h1 class="text-4xl font-extrabold dark:text-white capitalize flex-1">
        {{ props.slug }}
      </h1>
      <button
        class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <Icon icon="plus" />
        <span>{{ props.newBtnName }}</span>
      </button>
    </div>
    <Search
      :on-search="(val: string) => console.log(val)"
      :placeholder="props.searchPlaceholder"
      :type="props.searchType"
    />
  </header>
</template>

<style scoped></style>
