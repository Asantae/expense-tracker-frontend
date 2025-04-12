import axios from 'axios';
import { getToken } from './tokenUtil';

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const httpClient = axios.create({
    baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default httpClient;
