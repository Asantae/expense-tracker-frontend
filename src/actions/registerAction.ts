import axios from 'axios';
import { registerUser } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { setUser } from '../store/userSlice';
import { getUserFromToken } from '../utils/tokenUtil';

export const register = (email: string, username: string, password: string, navigate: any): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const token = await registerUser(email, username, password);
    const user = getUserFromToken(token);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: token,
    });
    
    dispatch(setUser({
        userId: user.sub, 
      })
    );

    navigate(`/dashboard/user/${user.sub}`)

    showSuccessToast('Registration successful!');
  } catch (error) {
    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast()
    }
  }
};