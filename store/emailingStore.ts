import { defineStore } from "pinia";
import type {
  Volo_Abp_SettingManagement_EmailSettingsDto,
  Volo_Abp_SettingManagement_SendTestEmailInput,
  Volo_Abp_SettingManagement_UpdateEmailSettingsDto,
} from "~/services/proxy/src";
import { getAbpServiceProxy, useToast } from "~/store/state";
interface EmailingState {
  data: Volo_Abp_SettingManagement_EmailSettingsDto | null;
  isLoading: boolean;
  error: {
    statusCode: number;
    message: string;
  } | null;
  update: {
    error: {
      statusCode: number;
      message: string;
    } | null;
    status: boolean;
  };
  testEmail: {
    error: {
      statusCode: number;
      message: string;
    } | null;
    status: boolean;
  };
}
export const useEmailing = defineStore("emailing", {
  state: (): EmailingState => ({
    data: null,
    isLoading: false,
    error: null,
    update: {
      error: null,
      status: false,
    },
    testEmail: {
      error: null,
      status: false,
    },
  }),
  actions: {
    async fetch() {
      const url = getAbpServiceProxy("/setting-management/emailing");
      this.isLoading = true;
      const { data, error } =
        await useFetch<Volo_Abp_SettingManagement_EmailSettingsDto>(url);
      if (error.value) {
        this.error = {
          statusCode: error.value.statusCode ?? 500,
          message: error.value.message,
        };
        this.isLoading = false;
        throw error.value;
      }
      this.isLoading = false;
      this.data = data.value;
    },
    async update(payload: Volo_Abp_SettingManagement_UpdateEmailSettingsDto) {
      this.update.status = true;
      const url = getAbpServiceProxy("/setting-management/emailing");
      await $fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).catch((error) => {
        this.update.error = {
          statusCode: error.statusCode ?? 500,
          message: error.message,
        };
        this.update.status = false;
        const toast = useToast();
        toast.show({
          message: "Error updating email settings",
          type: "error",
          dismissible: true,
          autoClose: true,
        });
        throw error;
      });

      const toast = useToast();
      toast.show({
        message: "Email settings updated",
        type: "success",
        dismissible: true,
        autoClose: true,
      });
      return true;
    },
    resetTestingEmail() {
      this.testEmail.status = false;
      this.testEmail.error = null;
    },
    async sendTestEmail(
      payload: Volo_Abp_SettingManagement_SendTestEmailInput,
    ) {
      this.testEmail.status = true;
      const url = getAbpServiceProxy(
        "/setting-management/emailing/send-test-email",
      );
      await $fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).catch((error) => {
        this.testEmail.error = {
          statusCode: error.statusCode ?? 500,
          message: error.message,
        };
        this.testEmail.status = false;
        const toast = useToast();
        toast.show({
          message: "Error sending test email",
          type: "error",
          dismissible: true,
          autoClose: true,
        });
        throw error;
      });

      const toast = useToast();
      toast.show({
        message: "Test email sent",
        type: "success",
        dismissible: true,
        autoClose: true,
      });
      return true;
    },
  },
});
