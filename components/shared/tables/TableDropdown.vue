<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/abp/ui/dropdown-menu";
import Icon from "~/components/shared/Icon.vue";

interface Props {
  id: string;
  name: string;
  items: Array<{ name: string }>;
}
defineProps<Props>();
const emit = defineEmits(["action"]);
export type ActionEventParams = {
  invokedBy: string;
  value: { id: string; name: string };
};
const onActionEvent = (params: ActionEventParams) => {
  const { invokedBy, value } = params;
  console.log("onActionEvent", invokedBy, value);
  emit("action", { data: { invokedBy, value } });
};
</script>

<template>
  <LazyClientOnly fallback="loading...">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" class="space-x-2" size="sm">
          <span class="sr-only">Actions</span>
          <Icon icon="settings" :w="16" :h="16" />
          <span> Actions </span>
          <Icon icon="chev-down" :w="16" :h="16" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          v-for="item in items"
          :key="item.name"
          class="capitalize"
          @click="onActionEvent({ invokedBy: item.name, value: { id, name } })"
        >
          {{ item.name }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </LazyClientOnly>
</template>

<style scoped></style>
