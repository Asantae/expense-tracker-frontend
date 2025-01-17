import axios from 'axios';
import { getToken, removeToken, setAccessToken, setRefreshToken } from '../utils/tokenUtil';

export const API_BASE_URL = 'http://localhost:5221/api';

export const logoutUser = () => {
    removeToken();
};

export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken')
    return token && refreshToken !== null;
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/User/login`, { username, password });
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;

        setAccessToken(token);
        setRefreshToken(refreshToken);

        return token;
    } catch (error) {

        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/User/register`, { 
            email, 
            username, 
            password 
        });
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;

        setAccessToken(token);
        setRefreshToken(refreshToken);

        return token;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const getCategories = async () => {
        const token = getToken();

        if (!token) {
            throw new Error('User is not logged in.');
        }

    try {
        const response = await axios.get(`${API_BASE_URL}/Expense/categories`, {
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

export const getExpenses = async () => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/Expense/expense`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const addExpense = async (amount: number, description: string, categoryId: string, frequency: number) => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/Expense/addExpense`, {
            amount,
            description,
            categoryId,
            frequency
        });

        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};