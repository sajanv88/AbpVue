<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { Alert, AlertDescription, AlertTitle } from "@/abp/ui/alert";

interface IAlertProps {
  type: "success" | "destructive" | "warning" | "info";
  message: string;
  dismissible?: boolean;
  notice?: boolean;
}

defineProps<IAlertProps>();
</script>

<template>
  <Alert :variant="type">
    <AlertTitle> Notification! </AlertTitle>
    <AlertDescription> {{ message }} </AlertDescription>
    <span class="absolute block right-0 top-0">
      <Button
        v-if="dismissible"
        @click="$emit('dismissed')"
        type="button"
        class="hover:bg-transparent"
        size="icon"
        variant="ghost"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
        <Icon icon="cross" :w="16" :h="16" />
      </Button>
    </span>
  </Alert>
</template>

<style scoped></style>
