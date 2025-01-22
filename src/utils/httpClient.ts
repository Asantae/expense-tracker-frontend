import axios from 'axios';
import { getToken } from './tokenUtil';

export const API_BASE_URL = 'http://localhost:5221/api';

const httpClient = axios.create({
    baseURL: API_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default httpClient;
