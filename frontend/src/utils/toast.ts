import { toast } from 'react-toastify';

export const showToast = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  loading: () => {
    return toast.loading('Loading...');
  },
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  }
}; 