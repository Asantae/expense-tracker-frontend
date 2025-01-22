import axios from 'axios';
import { registerUser } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { setUser } from '../store/userSlice';

export const register = (email: string, username: string, password: string, navigate: any): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const { token, user} = await registerUser(email, username, password);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: token,
    });
    
    dispatch(setUser(user));

    navigate(`/dashboard/user/${user.id}`)

    showSuccessToast('Registration successful!');
  } catch (error) {
    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast()
    }
  }
};