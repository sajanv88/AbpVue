<script setup lang="ts">
const currentTheme = ref({
  theme: localStorage.getItem("theme") || "light",
  visible: new Map([
    ["light", true],
    ["dark", false],
  ]),
});

const onThemeSwitchEvent = () => {
  if (currentTheme.value.theme == "dark") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  } else if (currentTheme.value.theme == "light") {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  currentTheme.value.visible.forEach((value, key) => {
    currentTheme.value.visible.set(key, false);
  });
  const theme = localStorage.getItem("theme")!;
  currentTheme.value.theme = theme;
  currentTheme.value.visible.set(theme, true);
};

onMounted(() => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add(currentTheme.value.theme);
});
</script>

<style>
[data-visible="false"],
[data-visible="false"] {
  display: none;
}

[data-visible="true"],
[data-visible="true"] {
  display: inline;
}
</style>
<template>
  <button
    @click="onThemeSwitchEvent"
    type="button"
    class="mr-3 text-gray-500 dark:text-white dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 text-sm p-2.5"
  >
    <span class="js-light" :data-visible="currentTheme.visible.get('light')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-brightness-high"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
        />
      </svg>
    </span>
    <span class="js-dark" :data-visible="currentTheme.visible.get('dark')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-moon"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"
        />
      </svg>
    </span>
  </button>
</template>
