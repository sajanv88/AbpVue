<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
export interface IToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  dismissible?: boolean;
}
const props = defineProps<IToastProps>();

const emit = defineEmits(["dismissed"]);
const cssClasses: Record<IToastProps["type"], string> = {
  success:
    "text-green-500 border-green-500 dark:border-green-800 bg-green-100 dark:bg-green-800 dark:text-green-200",
  error:
    "text-red-500 border-red-100 dark:border-red-800 bg-red-100 dark:bg-red-800 dark:text-red-200",
  warning:
    "text-yellow-500  border-yellow-100 dark:border-yellow-800 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200",
  info: "text-blue-500 border-blue-100 dark:border-blue-800 bg-blue-100 dark:bg-blue-800 dark:text-blue-200",
};
onMounted(() => {
  if (props.autoClose) {
    setTimeout(() => {
      emit("dismissed");
    }, props.autoCloseDelay || 3000);
  }
});

const colorMapper: Record<IToastProps["type"], string> = {
  success: "green",
  error: "red",
  warning: "yellow",
  info: "blue",
};
const borderColor = `border-${colorMapper[props.type]}-500 dark:border-${colorMapper[props.type]}-800`;
</script>

<template>
  <section class="border-t-4 bottom-5 right-5 w-[20rem]" :class="borderColor">
    <section
      role="alert"
      class="flex items-center w-full max-w-xs p-4 shadow-xl text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-900"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8"
        :class="cssClasses[props.type]"
      >
        <Icon icon="check" v-if="props.type == 'success'" />
        <Icon icon="cross" v-if="props.type == 'error'" />
        <Icon icon="info-circle" v-if="props.type == 'warning'" />
        <Icon icon="info-circle" v-if="props.type == 'info'" />
      </div>
      <p class="ms-3 text-sm font-normal">{{ props.message }}</p>
      <button
        v-if="props.dismissible"
        @click="$emit('dismissed')"
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8"
        :class="`text-${colorMapper[props.type]}-500 dark:text-${colorMapper[props.type]}-800`"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
        <Icon icon="cross" />
      </button>
    </section>
  </section>
</template>

<style scoped></style>
