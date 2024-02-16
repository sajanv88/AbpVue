<script setup lang="ts">
import { useFeatures } from "~/store/state";
import Dialog from "~/components/shared/Dialog.vue";
import { storeToRefs } from "pinia";
import Checkbox from "~/components/shared/Checkbox.vue";
import type { Volo_Abp_FeatureManagement_UpdateFeaturesDto } from "~/services/proxy/src";
import Alert from "~/components/shared/Alert.vue";
interface ITenantFeatureManagementProps {
  open: boolean;
}
defineProps<ITenantFeatureManagementProps>();

const featureStore = useFeatures();
const { featureGroups } = storeToRefs(featureStore);
const processing = ref(false);
const resetToDefault = async () => {
  await featureStore.resetFeaturesToDefault(featureStore.selectedTenantId);
};

const onSubmitEvent = async (e: SubmitEvent) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  const formElem = e.target as HTMLFormElement;
  const formData = new FormData(formElem);

  const payload: Volo_Abp_FeatureManagement_UpdateFeaturesDto = {
    features: [],
  };

  for (const [key, value] of formData.entries()) {
    payload.features.push({
      name: key,
      value: value as string,
    });
  }
  processing.value = true;
  await featureStore.updateFeatureSettings(payload);
  processing.value = false;
};
</script>

<template>
  <Dialog
    id="features"
    title="Features"
    :open="open"
    @close="$emit('dialogClose')"
  >
    <Alert
      type="error"
      :message="featureStore.error?.message"
      v-if="featureStore.error"
    />
    <div
      class="p-4 md:p-5 text-gray-900 dark:text-white"
      v-if="featureGroups?.groups?.length > 0"
    >
      <form @submit="onSubmitEvent">
        <div
          class="flex"
          v-for="group in featureGroups.groups"
          :key="group.name"
        >
          <p class="text-md w-[15rem]">
            {{ group.displayName }}
          </p>

          <div class="flex flex-col w-[calc(100%-12rem)]">
            <h3 class="text-xl font-medium pb-4">
              {{ group.displayName }}
            </h3>
            <hr class="mb-4" />
            <div
              class="text-md mb-4"
              v-for="feature in group.features"
              :key="feature.name"
            >
              <Checkbox
                :name="feature.name"
                v-if="feature.valueType.name == 'ToggleStringValueType'"
                :id="feature.name.split(' ').join('_')"
                :checked="feature.value"
                :label="feature.displayName"
                :helper-text="feature.description"
              />
            </div>
          </div>
        </div>
        <footer class="flex items-center justify-end space-x-2 mt-10">
          <span v-if="processing">Updating settings...</span>
          <button
            v-if="!processing"
            type="button"
            @click="featureStore.resetFeatures()"
            class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Cancel
          </button>
          <button
            v-if="!processing"
            type="button"
            @click="resetToDefault"
            class="inline-flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Reset to default
          </button>
          <button
            v-if="!processing"
            type="submit"
            class="inline-flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  </Dialog>
</template>

<style scoped></style>
