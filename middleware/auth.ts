import { getAbpServiceProxy, useProfile } from "~/store/state";

const errorCodes = [401, 500];
export default defineNuxtRouteMiddleware(async () => {
  const url = getAbpServiceProxy("/account/my-profile");

  const { error, data } = await useFetch(url);
  const profileStore = useProfile();
  if (data.value) {
    profileStore.setProfile(data.value);
  }

  const value = error.value;
  if (value?.statusCode) {
    if (errorCodes.includes(value.statusCode)) {
      return navigateTo("/api/auth/signout");
    }
  }
});
