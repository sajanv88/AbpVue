import { useProfile } from "~/store/state";
import type { Volo_Abp_Account_ProfileDto } from "~/services/proxy/src";

const errorCodes = [401, 500];
const isAuthenticated = async () => {
  const profileStore = useProfile();
  const url = "/api/user";
  const { error, data } = await useFetch<Volo_Abp_Account_ProfileDto>(url);
  if (data.value) {
    profileStore.setProfile(data.value);
    return true;
  }
  console.error(`Authentication error:`, error.value);
  return false;
};
export default defineNuxtRouteMiddleware(async () => {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return navigateTo("/api/auth/signin");
  }
  return;
});
