import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    sub: string;
    iat: string;
}

interface TokenPayload {
    exp: number; 
  }

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const getUserFromToken = (token: string): DecodedToken => {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken;
};

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

export const checkTokenForMatch = (token: string) => {
    const user = getUserFromToken(token);
};

export const isTokenValid = (token: string): boolean => {
    try {
      const decoded: TokenPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false; 
    }
};

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
};

export const setAccessToken = (accessToken: string) => {
    localStorage.setItem('token', accessToken);
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};