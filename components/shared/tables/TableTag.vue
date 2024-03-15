<script setup lang="ts">
import Badge from "~/components/shared/Badge.vue";

interface Props {
  name: string;
  tags: Array<{ name: string; id: string }>;
}
defineProps<Props>();
</script>

<template>
  <span class="flex items-center space-x-1">
    <span>{{ name }}</span>
    <span v-for="tag in tags" :key="tag.id" class="inline-flex capitalize">
      <Badge
        :color="tag.name == 'default' ? 'green' : 'blue'"
        :text="tag.name"
      />
    </span>
  </span>
</template>

<style scoped></style>
