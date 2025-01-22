import store from '../store/store';
import { getRefreshToken, getToken, setAccessToken, setRefreshToken } from '../utils/tokenUtil';
import httpClient from '../utils/httpClient';

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const token = getToken();
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      console.error('No refresh token available');
      return null;
    }

    const response = await httpClient.post(`/Auth/refresh`, {  Params: { 
      Token: token, 
      RefreshToken: refreshToken 
    }}, 
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