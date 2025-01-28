import axios from 'axios';
import { loginGuest } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { setUser } from '../store/userSlice';

export const loginAsGuest = (navigate: any): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch({ type: 'user/setUser/pending'});
    
    const { token, user } = await loginGuest();

    dispatch({
      type: 'GUEST_LOGIN_SUCCESS',
      payload: token,
    });

    dispatch({ type: 'user/setUser/fulfilled' });

    dispatch(setUser(user));

    navigate(`/dashboard/user/${user.id}`)

    showSuccessToast('Guest login successful');
  } catch (error) {
    dispatch({
      type: 'user/setUser/rejected',
      payload: error,
    });

    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast()
    }
  }
};