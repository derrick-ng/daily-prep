import { toast } from "sonner";

interface ToastResponseProp {
    success: boolean;
    message: string;
}

export function showToastResponse(data: ToastResponseProp) {
    if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
}