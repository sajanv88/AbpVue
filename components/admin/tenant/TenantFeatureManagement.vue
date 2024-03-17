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
      type="destructive"
      :message="featureStore.error?.message"
      v-if="featureStore.error"
    />
    <div
      class="text-gray-900 dark:text-white"
      v-if="featureGroups?.groups?.length > 0"
    >
      <form @submit="onSubmitEvent">
        <div
          class="flex"
          v-for="group in featureGroups.groups"
          :key="group.name"
        >
          <p class="text-md hidden md:block md:w-[15rem]">
            {{ group.displayName }}
          </p>

          <div class="flex flex-col md:w-[calc(100%-12rem)]">
            <h3 class="text-xl font-medium pb-4">
              {{ group.displayName }}
            </h3>
            <hr class="mb-4 hidden md:block" />
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
          <Button
            v-if="!processing"
            type="button"
            @click="featureStore.resetFeatures()"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button v-if="!processing" type="button" @click="resetToDefault">
            Reset to default
          </Button>
          <Button v-if="!processing" type="submit"> Save </Button>
        </footer>
      </form>
    </div>
  </Dialog>
</template>

<style scoped></style>
