import type {
  Volo_Abp_Account_ChangePasswordInput,
  Volo_Abp_Account_ProfileDto,
  Volo_Abp_Account_UpdateProfileDto,
} from "~/services/proxy/src";
import { getAbpServiceProxy, useToast } from "~/store/state";

type ProfileState = Volo_Abp_Account_ProfileDto & {
  error: { message: string; statusCode: number } | null;
  updatePassword: {
    error: { message: string; statusCode: number } | null;
  };
};
export const useProfile = defineStore("profile", {
  state: (): ProfileState => {
    return {
      userName: "",
      email: "",
      name: "",
      surname: "",
      phoneNumber: "",
      isExternal: false,
      hasPassword: false,
      concurrencyStamp: "",
      error: null,
      updatePassword: {
        error: null,
      },
    };
  },
  actions: {
    setProfile(profile: Volo_Abp_Account_ProfileDto) {
      this.userName = profile.userName ?? "";
      this.email = profile.email ?? "";
      this.name = profile.name ?? "";
      this.surname = profile.surname ?? "";
      this.phoneNumber = profile.phoneNumber ?? "";
      this.isExternal = profile.isExternal ?? false;
      this.hasPassword = profile.hasPassword ?? false;
      this.concurrencyStamp = profile.concurrencyStamp ?? "";
    },
    async fetchProfile() {
      const url = `${getAbpServiceProxy()}/account/my-profile`;
      const { error, data } = await useFetch(url);
      if (error.value) {
        this.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        };
        return;
      }
      this.setProfile(data.value);
    },
    async updateProfile(payload: Volo_Abp_Account_UpdateProfileDto) {
      const url = `${getAbpServiceProxy()}/account/my-profile`;
      await $fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
      }).catch((error) => {
        if (error) {
          this.error = {
            message: error.statusMessage,
            statusCode: error.statusCode,
          };
          throw error;
        }
      });

      this.setProfile(payload);
      const toastStore = useToast();
      toastStore.show({
        message: "Profile updated successfully",
        type: "success",
        dismissible: true,
        autoClose: true,
      });
    },
    async changePassword(
      payload: Volo_Abp_Account_ChangePasswordInput,
      confirmPassword: string,
    ) {
      if (payload.newPassword !== confirmPassword) {
        this.updatePassword.error = {
          message: "Confirm Password do not match",
          statusCode: 400,
        };
        return;
      }
      const url = `${getAbpServiceProxy()}/account/my-profile/change-password`;
      await $fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).catch((error) => {
        if (error) {
          this.updatePassword.error = {
            message: error.statusMessage,
            statusCode: error.statusCode,
          };
          throw error;
        }
      });

      const toastStore = useToast();
      this.updatePassword.error = null;
      toastStore.show({
        message: "Password updated successfully",
        type: "success",
        dismissible: true,
        autoClose: true,
      });
    },
    resetError() {
      this.error = null;
      this.updatePassword.error = null;
    },
  },
});
