<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogContent,
} from "~/abp/ui/dialog";
interface DialogProps {
  title: string;
  open: boolean;
}
defineProps<DialogProps>();
const emits = defineEmits(["close"]);
const onCloseEvent = () => {
  emits("close");
};
</script>

<template>
  <Dialog :open="open">
    <DialogContent
      class="p-0 w-full md:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
      aria-describedby="Create Tenant Dialog"
    >
      <DialogHeader class="pl-5 pr-5 pt-5">
        <DialogTitle class="flex items-center">
          <span class="flex-1">
            {{ title }}
          </span>
          <DialogClose @click="onCloseEvent">
            <Icon icon="cross" :w="16" :h="16" />
          </DialogClose>
        </DialogTitle>
      </DialogHeader>
      <main
        class="border-t border-primary grid gap-4 py-4 overflow-y-auto px-6 pt-5"
      >
        <div class="flex flex-col justify-between">
          <slot />
        </div>
      </main>
    </DialogContent>
  </Dialog>
</template>
<style scoped></style>
