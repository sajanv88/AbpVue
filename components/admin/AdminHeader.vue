<script setup lang="ts">
import Icon from "~/components/shared/Icon.vue";
import { useAbpConfiguration, useNavigation } from "~/store/state";
import { storeToRefs } from "pinia";
import Avatar from "~/components/shared/Avatar.vue";
import IconButton from "~/components/shared/IconButton.vue";
import { Card, CardHeader } from "~/abp/ui/card";
import Alert from "~/components/shared/Alert.vue";
import ThemeSwitch from "~/components/shared/ThemeSwitch.vue";

defineProps({
  sticky: Boolean,
  position: String,
});

const abpConfigStore = useAbpConfiguration();
const navStore = useNavigation();
const { config } = storeToRefs(abpConfigStore);
const emit = defineEmits(["toggleNav"]);
const name = computed(() => {
  return (
    config.value?.currentUser?.name?.charAt(0).toUpperCase() ||
    config.value?.currentUser?.userName?.charAt(0).toUpperCase() ||
    "N/A"
  );
});
const fullName = computed(() => {
  if (config.value?.currentUser?.name && config.value?.currentUser?.surName) {
    return `${config.value?.currentUser?.name} ${config.value?.currentUser?.surName}`;
  }
  if (config.value?.currentUser?.name) {
    return config.value?.currentUser?.name;
  }
  return config.value?.currentUser?.userName;
});

const onMenuClickEvent = () => {
  navStore.toggleSideNavbar();
  emit("toggleNav");
};
</script>

<template>
  <section class="sticky bg-warning-foreground">
    <!--  Remove this Alert component when you are using it on production env  -->
    <Alert
      class="m-0"
      type="warning"
      message="Please note that the following application is intended solely for demonstration purposes."
      :notice="true"
    />
  </section>
  <Card class="shadow">
    <CardHeader>
      <div class="flex items-center h-full">
        <div class="flex-1">
          <h1
            class="hidden md:block text-lg tracking-tight font-semibold capitalize md:text-xl lg:text-2xl"
          >
            {{ fullName }}
          </h1>
          <IconButton @click="onMenuClickEvent" classname="inline md:hidden">
            <Icon icon="menu" />
          </IconButton>
        </div>

        <ThemeSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar :name="name" :full-name="config?.currentUser?.userName" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div>{{ config?.currentUser?.name }}</div>
              <div class="font-medium truncate">
                {{ config?.currentUser?.email }}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <div class="py-1">
                <NuxtLink to="/admin/profile">Profile</NuxtLink>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div class="py-1">
                <a href="/api/auth/signout" class="flex items-center space-x-2">
                  <span class="inline-block">
                    <Icon icon="logout" :w="18" :h="18" />
                  </span>
                  <span class="inline-block text-sm"> Logout </span>
                </a>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
  </Card>
</template>

<style scoped></style>
