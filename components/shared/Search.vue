<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import IconButton from "~/components/shared/IconButton.vue";
import { Input } from "~/abp/ui/input";

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
    <div class="relative w-full items-center">
      <Input
        type="search"
        name="search"
        class="p-7 pl-10"
        :placeholder="props.placeholder"
        @change="
          $emit('onSearch', $event.target.value);
          searchString = $event.target.value;
        "
        required
      />
      <span
        v-if="searchString.length > 0"
        class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Button
          @click="
            $emit('onSearch', '');
            onReset();
          "
          variant="ghost"
          size="icon"
        >
          <Icon icon="cross" :w="16" :h="16" />
        </Button>
      </span>
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon icon="search" />
      </span>
    </div>
  </form>
</template>

<style scoped></style>
