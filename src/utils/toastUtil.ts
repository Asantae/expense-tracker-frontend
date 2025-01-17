import { toast } from 'react-toastify';

const genericToastString = `An unexpected error has occurred`;

export const showErrorToast = (message?: string) => {
  if(message){
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } else {
    toast.error(genericToastString, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } 
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
