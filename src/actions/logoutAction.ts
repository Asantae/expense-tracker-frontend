import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { persistor, RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { getRefreshToken } from '../utils/tokenUtil';
import { clearUser } from '../store/userSlice';
import { logoutUser } from '../services/api';

export const logout = (navigate: any): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        showErrorToast('No refresh token found. Please log in again.');
        return;
    }
    await logoutUser();

    persistor.purge();

    dispatch(clearUser());

    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: refreshToken,
    });

    navigate(`/login`)

    showSuccessToast('Logout successful!');
  } catch (error) {
    console.log(error);
    
    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast()
    }
  }
};