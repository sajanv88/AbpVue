import { defineStore } from "pinia";
import { v4 } from "uuid";
import { useToastNotification } from "@/abp/ui/toast";

interface Props {
  type: "success" | "destructive" | "warning" | "info" | "default";
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  dismissible?: boolean;
}

type ToastProps = Props & {
  id?: string;
};

type ToastState = {
  toasts: ToastProps[];
};

const notification = useToastNotification();
export const useToast = defineStore("toast", {
  state: (): ToastState => ({
    toasts: [],
  }),
  actions: {
    show(options: ToastProps) {
      const id = v4();
      const props = { ...options, id };
      notification.toast({
        variant: props.type,
        description: props.message,
        action: {
          label: "Close",
          onClick: () => this.hide(props.id),
        },
      });
    },
    hide(id: string) {
      const index = this.toasts.findIndex((x) => x.id === id);
      if (index === -1) return;
      this.toasts.splice(index, 1);
    },
  },
});
