import axios from 'axios';
import { getToken } from '../utils/tokenUtil';

export const API_BASE_URL = 'http://localhost:5221/api';

export const logoutUser = () => {
    localStorage.removeItem('jwtToken');
};

export const isUserLoggedIn = () => {
    const token = localStorage.getItem('jwtToken');
    return token !== null;
};

export const fetchCategories = async () => {
        const token = getToken();

        if (!token) {
            throw new Error('User is not logged in.');
        }

    try {
        const response = await axios.get(`${API_BASE_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchExpenses = async () => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    const response = await fetch(`${API_BASE_URL}/expense`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    return response.json();
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
        const token = response.data.token;

        localStorage.setItem('jwtToken', token);

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};