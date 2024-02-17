import { defineStore } from "pinia";
import { v4 } from "uuid";
import type { IToastProps } from "~/components/shared/Toast.vue";

type ToastProps = IToastProps & {
  show: boolean;
  id: string;
};

type ToastState = {
  toasts: ToastProps[];
};
export const useToast = defineStore("toast", {
  state: (): ToastState => ({
    toasts: [],
  }),
  actions: {
    show(options: ToastProps) {
      this.toasts.push({ id: v4(), ...options });
    },
    hide(id: string) {
      const index = this.toasts.findIndex((x) => x.id === id);
      if (index === -1) return;
      this.toasts.splice(index, 1);
    },
  },
});
