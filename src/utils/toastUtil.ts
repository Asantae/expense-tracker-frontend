import { toast } from 'react-toastify';

const genericToastString = `An unexpected error has occurred`;
const MAX_CHAR_LENGTH = 100;

export const showErrorToast = (message?: string) => {
  if(message && message.length < MAX_CHAR_LENGTH){
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
