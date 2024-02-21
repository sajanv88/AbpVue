<script setup lang="ts">
import { useRoles } from "~/store/state";
import Checkbox from "~/components/shared/Checkbox.vue";

const roleStore = useRoles();
await callOnce(roleStore.fetch);
</script>

<template>
  <section class="grid gap-2 grid-cols-12 space-y-3">
    <div class="col-span-12" v-for="role in roleStore.roles" :key="role.id">
      <Checkbox
        :id="role.name"
        :name="role.name"
        :checked="role.isDefault?.toString()"
        :label="role.name"
      />
    </div>
  </section>
</template>

<style scoped></style>
