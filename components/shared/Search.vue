<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import IconButton from "~/components/shared/IconButton.vue";

type SearchType = "tenants" | "roles" | "users";
interface ISearchProps {
  type: SearchType;
  placeholder: string;
}
const props = defineProps<ISearchProps>();
const formRef = ref<HTMLFormElement | null>(null);
const searchString = ref<string>("");
const onSubmitForm = (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(formRef.value!);
  const search = formData.get("search") as string;
  searchString.value = search;
};
const onReset = () => {
  searchString.value = "";
  formRef.value?.reset();
};
</script>

<template>
  <form @submit="onSubmitForm" ref="formRef">
    <div class="relative w-full">
      <input
        type="search"
        name="search"
        class="block p-4 w-full z-20 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        :placeholder="props.placeholder"
        @change="searchString = $event.target.value"
        required
      />
      <span v-if="searchString.length > 0" class="absolute top-3 end-16 z-10">
        <IconButton
          @click="onReset"
          classname="bg-transparent dark:bg-transparent border-none"
        >
          <Icon icon="cross" w="16" h="16" />
        </IconButton>
      </span>
      <button
        type="submit"
        class="absolute top-0 end-0 h-full p-3 text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 focus:border-blue-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <Icon icon="search" />
        <span class="sr-only">Search</span>
      </button>
    </div>
  </form>
</template>

<style scoped></style>
