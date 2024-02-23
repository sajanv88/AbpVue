<script setup lang="ts">
import Dialog from "~/components/shared/Dialog.vue";
interface IManageFeatures {
  open: boolean;
}

defineProps<IManageFeatures>();
const emit = defineEmits(["dialogClose"]);

const onCloseDialog = () => {
  emit("dialogClose");
};
</script>

<template>
  <Dialog
    id="manageFeatures"
    title="Features"
    :open="open"
    @close="onCloseDialog"
  >
    <section class="p-4 md:p-5">
      <p class="text-sm text-gray-700 dark:text-white">
        There isn't any available feature.
      </p>
    </section>
  </Dialog>
</template>

<style scoped></style>
