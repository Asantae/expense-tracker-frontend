import axios from 'axios';
import store from '../store/store';
import { API_BASE_URL } from './api';
import { getRefreshToken, getToken, setAccessToken, setRefreshToken } from '../utils/tokenUtil';

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const token = getToken();
    const refreshToken = getRefreshToken();
    console.log("Access Token:", token);
    console.log("Refresh Token:", refreshToken);

    if (!refreshToken) {
      console.error('No refresh token available');
      return null;
    }

    const response = await axios.post(`${API_BASE_URL}/Auth/refresh`, 
      { 
        Token: token,
        RefreshToken: refreshToken,
      }, 
      { withCredentials: true }
    );

    const newToken = response.data.token;
    const newRefreshToken = response.data.refreshToken;

    store.dispatch({ type: 'UPDATE_TOKEN', payload: newToken });
    setAccessToken(newToken);
    setRefreshToken(newRefreshToken);

    return newToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};

export default refreshAccessToken;