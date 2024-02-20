<script setup lang="ts">
interface ICheckboxProps {
  label: string;
  helperText?: string;
  checked: string;
  id: string;
  name: string;
  labelStyle?: string;
}
const props = defineProps<ICheckboxProps>();
const checkboxValue = ref(props.checked);
</script>

<template>
  <section class="flex">
    <section class="flex items-center h-5">
      <input type="hidden" :value="checkboxValue" :name="name" />
      <input
        :id="props.id"
        :aria-describedby="props.label"
        type="checkbox"
        v-model="checkboxValue"
        :value="props.checked"
        @change="$emit('onChangeEvent', $event.target.checked)"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </section>
    <section class="ms-2 text-sm">
      <label
        :for="props.id"
        class="font-medium text-gray-900 dark:text-white"
        :class="labelStyle"
        >{{ props.label }}</label
      >
      <p
        v-if="props.helperText !== ''"
        class="text-xs font-normal text-gray-500 dark:text-white"
      >
        {{ props.helperText }}
      </p>
    </section>
  </section>
</template>

<style scoped></style>
