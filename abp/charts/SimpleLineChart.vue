<script setup lang="ts" generic="TData">
interface Props {
  data: TData[];
}
defineProps<Props>();
</script>

<template>
  <ResponsiveContainer width="100%" height="{300}">
    <LineChart :data="data">
      <Line type="monotone" dataKey="max" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
</template>

<style scoped></style>
