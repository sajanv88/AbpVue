<script setup lang="ts">
import Card from "~/components/shared/Card.vue";
import Icon from "~/components/shared/Icon.vue";
const guides = ref([]);
const commercials = ref([]);
const { data, error } = useFetch("/api/guides", { server: true });
const { data: commercialData, error: commercialError } = useFetch(
  "/api/guides",
  { server: true, query: { type: "commercials" } },
);

onMounted(() => {
  guides.value = data.value;
  commercials.value = commercialData.value;
});
</script>

<template>
  <section class="pt-4">
    <h2 class="text-center text-lg md:text-xl text-gray-800 dark:text-white">
      Getting Started Guide
    </h2>
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-10">
      <Card :rounded="true" v-for="guide in guides" :key="guide.title">
        <h3
          class="text-lg text-gray-800 font-semibold dark:text-white pb-2 mb-4 border-b"
        >
          {{ guide.title }}
        </h3>
        <p class="text-md text-gray-800 dark:text-white pb-4">
          {{ guide.description }}
        </p>

        <a
          v-for="href in guide.link.hrefs"
          :key="href.name"
          :href="href.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex py-1 items-center w-full font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {{ href.name }}
          <Icon icon="chev-down" classname="-rotate-90" :w="16" :h="16" />
        </a>
      </Card>
    </div>
  </section>

  <section class="pt-4">
    <h2
      class="text-center text-2xl md:text-4xl font-semibold bg-gradient-to-tr from-cyan-300 to-indigo-600 bg-clip-text text-transparent"
    >
      Abp Commercial
    </h2>
    <p class="text-lg text-gray-800 dark:text-white text-center p-3">
      A Complete Web Application Platform Built on the ABP Framework
    </p>
    <div class="flex justify-center">
      <p
        class="md:w-1/2 text-gray-800 dark:text-gray-300 text-center text-md p-3"
      >
        ABP Commercial is a platform based on the open source ABP framework. It
        provides pre-built application modules, rapid application development
        tooling, professional UI themes, premium support and more.
      </p>
    </div>
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-10">
      <Card rounded v-for="guide in commercials" :key="guide.title">
        <h3
          class="text-lg text-gray-800 font-semibold dark:text-white pb-2 mb-4 border-b"
        >
          {{ guide.title }}
        </h3>

        <p class="text-md text-gray-800 dark:text-white pb-4">
          {{ guide.description }}
        </p>

        <a
          v-for="href in guide.link.hrefs"
          :key="href.name"
          :href="href.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex py-1 items-center w-full font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {{ href.name }}
          <Icon icon="chev-down" classname="-rotate-90" :w="16" :h="16" />
        </a>
      </Card>
    </div>
  </section>
</template>

<style scoped></style>
