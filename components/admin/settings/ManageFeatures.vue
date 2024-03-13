<script setup lang="ts">
import {
  Dialog,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "~/abp/ui/dialog";

interface IManageFeatures {
  open: boolean;
}

defineProps<IManageFeatures>();
const emit = defineEmits(["dialogClose"]);

const onCloseDialog = () => {
  emit("dialogClose");
};
</script>

<!--<template>-->
<!--  <Dialog-->
<!--    id="manageFeatures"-->
<!--    title="Features"-->
<!--    :open="open"-->
<!--    @close="onCloseDialog"-->
<!--  >-->
<!--    <section class="p-4 md:p-5">-->
<!--      <p class="text-sm text-gray-700 dark:text-white">-->
<!--        There isn't any available feature.-->
<!--      </p>-->
<!--    </section>-->
<!--  </Dialog>-->
<!--</template>-->

<template>
  <Dialog :open="open" @close="onCloseDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Features</DialogTitle>
      </DialogHeader>
      <section class="pt-2">
        <p class="text-sm text-gray-700 dark:text-white">
          There isn't any available feature.
        </p>
      </section>
      <DialogFooter>
        <Button @click="onCloseDialog">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<style scoped></style>
