import { getAbpServiceProxy } from "~/store/state";

const errorCodes = [401, 500];
export default defineNuxtRouteMiddleware(async () => {
  const url = `${getAbpServiceProxy()}/account/my-profile`;
  const { error, data } = await useFetch(url);
  console.log("my profile", data.value);
  const value = error.value;
  if (value?.statusCode) {
    if (errorCodes.includes(value.statusCode)) {
      return navigateTo("/api/auth/signout");
    }
  }
});
