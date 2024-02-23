import { getAbpServiceProxy, useProfile, useToast } from "~/store/state";
import type { Volo_Abp_Account_ProfileDto } from "~/services/proxy/src";

const errorCodes = [401, 500];
export default defineNuxtRouteMiddleware(async () => {
  const url = getAbpServiceProxy("/account/my-profile");
  const app = useNuxtApp();

  const profileStore = useProfile();

  const { error, data } = await useFetch<Volo_Abp_Account_ProfileDto>(url);

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
