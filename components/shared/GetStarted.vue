<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { Card, CardContent, CardHeader } from "~/abp/ui/card";
const guides = ref([]);
const commercials = ref([]);
const { data } = useFetch("/api/guides", { server: true });
const { data: commercialData } = useFetch("/api/guides", {
  server: true,
  query: { type: "commercials" },
});

onMounted(() => {
  guides.value = data.value;
  commercials.value = commercialData.value;
});
</script>

<template>
  <section class="pt-4">
    <h2 class="text-center text-lg md:text-xl">Getting Started Guide</h2>
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-10">
      <Card v-for="guide in guides" :key="guide.title">
        <CardHeader>
          <h3 class="text-lg font-semibold pb-2 mb-4 border-b">
            {{ guide.title }}
          </h3>
        </CardHeader>
        <CardContent>
          <p class="text-md pb-4">
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
        </CardContent>
      </Card>
    </div>
  </section>

  <section class="pt-4">
    <h2
      class="text-center text-2xl md:text-4xl font-semibold bg-gradient-to-tr from-cyan-300 to-indigo-600 bg-clip-text text-transparent"
    >
      Abp Commercial
    </h2>
    <p class="text-lg text-center p-3">
      A Complete Web Application Platform Built on the ABP Framework
    </p>
    <div class="flex justify-center">
      <p class="md:w-1/2 text-center text-md p-3">
        ABP Commercial is a platform based on the open source ABP framework. It
        provides pre-built application modules, rapid application development
        tooling, professional UI themes, premium support and more.
      </p>
    </div>
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-10">
      <Card v-for="guide in commercials" :key="guide.title">
        <CardHeader>
          <h3 class="text-lg font-semibold pb-2 mb-4 border-b">
            {{ guide.title }}
          </h3>
        </CardHeader>
        <CardContent>
          <p class="text-md pb-4">
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
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<style scoped></style>
