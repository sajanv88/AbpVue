<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
export type ActionCtaDataType = {
  value: Record<string, unknown>;
  invokedBy: string;
};
interface ITableProps {
  headers: Array<{ name: string }>;
  actionCta?: { name: string };
  columns: Array<Record<string, unknown>>;
  isLoading: boolean;
}
defineProps<ITableProps>();
</script>

<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto h-[34rem]"
  >
    <div v-if="isLoading" class="flex items-center justify-center h-40">
      <span>Loading...</span>
    </div>
    <table
      v-if="!isLoading"
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-md text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="p-4" v-for="th in headers" :key="th.name">
            <span class="text-gray-500 dark:text-white">{{ th.name }}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/10 dark:hover:bg-gray-600/10"
          v-for="col in columns"
          :key="col.id"
        >
          <th
            scope="row"
            class="p-4 w-2/12 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <button
              v-if="actionCta"
              type="button"
              @click="
                $emit('onAction', {
                  data: {
                    invokedBy: actionCta.name,
                    value: col,
                  } as ActionCtaDataType,
                })
              "
              class="inline-flex items-center justify-center px-2 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              <Icon icon="settings" :w="16" :h="16" />
              <span> Actions </span>
            </button>
          </th>
          <th class="p-4">
            {{ col.name }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
