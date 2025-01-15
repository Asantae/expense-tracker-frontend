import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store/store';

export const loginAction = (username: string, password: string): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User/login`, { username, password });
    const { token } = response.data;

    localStorage.setItem('token', token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: token,
    });

    toast.success('Login successful');
  } catch (error) {
    toast.error('Login failed: Invalid username or password');
    console.error('Error during login:', error);
  }
};
