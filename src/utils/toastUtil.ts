import { toast } from 'react-toastify';

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
