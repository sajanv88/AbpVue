import type {
  Volo_Abp_Account_ChangePasswordInput,
  Volo_Abp_Account_ProfileDto,
  Volo_Abp_Account_UpdateProfileDto,
} from "~/services/proxy/src";
import { getAbpServiceProxy } from "~/store/state";

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
      const { error, data } = await useFetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      if (error.value) {
        this.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        };
        return;
      }
      this.setProfile(payload);
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
      const { error, data } = await useFetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (error.value) {
        this.updatePassword.error = {
          message: error.value.statusMessage,
          statusCode: error.value.statusCode,
        };
        return;
      }
      this.updatePassword.error = null;
    },
    resetError() {
      this.error = null;
      this.updatePassword.error = null;
    },
  },
});
