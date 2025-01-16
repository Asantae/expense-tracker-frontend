import axios from 'axios';
import { loginUser } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
// import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/tokenUtil';
import { setUser } from '../store/userSlice';

export const login = (username: string, password: string): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    // const navigate = useNavigate()
    const token = await loginUser(username, password);
    const user = getUserFromToken(token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: token,
    });

    dispatch(setUser({
      userId: user.sub, 
      username: user.unique_name, 
      email: user.email})
    );

    // navigate(`/user/${user.sub}`)

    showSuccessToast('Login successful!');
  } catch (error) {
    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};