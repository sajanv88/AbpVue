<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import Badge from "~/components/shared/Badge.vue";

export type ActionCtaDataType = {
  value: Record<string, unknown>;
  invokedBy: string;
};
interface ITableProps {
  headers: Array<{ name: string }>;
  actionCta?: { name: string; options?: Array<{ name: string }> };
  columns: Array<Record<string, unknown>>;
  isLoading: boolean;
  isNoData?: boolean;
}
defineProps<ITableProps>();
const toggleSettings = ref("");
const onActionEvent = (id: string) => {
  if (toggleSettings.value === id) {
    toggleSettings.value = "";
    return;
  }
  toggleSettings.value = id;
};

const onWindowClickCallback = (e: MouseEvent) => {
  const elem = e.target as HTMLElement;
  if (
    !elem.classList.contains("js-ref") &&
    !elem.classList.contains("js-actionRef")
  ) {
    toggleSettings.value = "";
  }
};
onMounted(() => {
  window.addEventListener("click", onWindowClickCallback, { capture: true });
});

onUnmounted(() => {
  window.removeEventListener("click", onWindowClickCallback, { capture: true });
});
</script>

<template>
  <div
    class="relative overflow-x-auto shadow-md border dark:border-gray-700 sm:rounded-lg overflow-y-auto min-h-fit max-h-[34rem]"
  >
    <table
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
        <tr v-if="isLoading">
          <th>Loading...</th>
        </tr>
        <tr v-if="isNoData">
          <th class="pt-4 pl-4">No data available</th>
          <th class="pt-4 pl-4 pb-4">0 total</th>
        </tr>

        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/10 dark:hover:bg-gray-600/10"
          v-for="col in columns"
          :key="col.id"
        >
          <th scope="row" class="p-4 w-2/12 font-medium whitespace-nowrap">
            <span class="relative block" v-if="actionCta">
              <button
                type="button"
                @click="onActionEvent(col.id.toString())"
                class="inline-flex items-center justify-center px-2 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 js-actionRef"
              >
                <Icon icon="settings" :w="16" :h="16" />
                <span> Actions </span>
                <Icon icon="chev-down" :w="16" :h="16" />
              </button>
              <span
                v-if="actionCta?.options?.length > 0"
                class="absolute text-md text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 shadow-md js-ref"
                :data-settings-enabled="
                  toggleSettings === col.id.toString() ? 'true' : 'false'
                "
                :class="
                  toggleSettings === col.id.toString() ? 'block' : 'hidden'
                "
              >
                <ul
                  class="pb-2 text-gray-800 dark:text-white capitalize select-none"
                >
                  <li
                    v-for="o in actionCta.options"
                    :key="o.name"
                    class="hover:bg-gray-400 hover:dark:bg-gray-800/60"
                    :class="
                      col.name === 'admin' && o.name === 'Delete'
                        ? 'hidden'
                        : 'block'
                    "
                    @click="
                      $emit('onAction', {
                        data: {
                          invokedBy: o.name,
                          value: col,
                        } as ActionCtaDataType,
                      });
                      onActionEvent('');
                    "
                  >
                    <span class="block pt-2 pb-2 pl-4 pr-4 js-actionRef">{{
                      o.name
                    }}</span>
                  </li>
                </ul>
              </span>
            </span>
          </th>
          <th class="p-4">
            <span class="inline-flex items-center">
              <span :class="col.tags?.length > 0 ? 'w-[3.5rem]' : ''">
                {{ col.name }}
              </span>
              <span
                v-for="tag in col?.tags"
                :key="tag.id"
                class="inline-flex capitalize"
              >
                <Badge
                  :color="tag.name == 'default' ? 'green' : 'blue'"
                  :text="tag.name"
                />
              </span>
            </span>
          </th>
          <th class="p-4">
            {{ col.email }}
          </th>
          <th class="p-4">
            {{ col.phoneNumber }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
[data-settings-enabled="true"] {
  width: 150px;
  max-height: fit-content;
  z-index: 100;
  top: 40px;
}
</style>
