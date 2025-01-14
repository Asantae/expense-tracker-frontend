import axios from 'axios';
import { AppThunk } from '../store';

const API_BASE_URL = 'http://localhost:5221/api/user';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction;

const loginRequest = (): LoginRequestAction => ({
  type: LOGIN_REQUEST
});

const loginSuccess = (token: string): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { token }
});

const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const loginUser = (username: string, password: string): AppThunk => async dispatch => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    const { token } = response.data;

    localStorage.setItem('authToken', token); // Store token in localStorage

    dispatch(loginSuccess(token));
  } catch (error: any) {
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};
