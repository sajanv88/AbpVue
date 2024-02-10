import { getAbpServiceProxy } from "~/store/state";

export default defineNuxtRouteMiddleware(async () => {
  const url = `${getAbpServiceProxy()}/account/my-profile`;
  const { error } = await useFetch(url);
  if (error.value?.statusCode === 401) {
    return navigateTo("/api/auth/signout");
  }
});
