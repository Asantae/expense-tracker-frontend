import { getToken, getUserFromToken, setAccessToken, setRefreshToken } from '../utils/tokenUtil';
import httpClient from '../utils/httpClient';

export const getUser = async () => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    const userId = getUserFromToken(token).sub;

    try {
        const response = await httpClient.get(`/User/getUser`, {
            params: { userId },
        });
        
        return response.data.user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    return token && refreshToken !== null;
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await httpClient.post(`/User/login`, { 
            username, 
            password
        });
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        const user = response.data.user;
        
        setAccessToken(token);
        setRefreshToken(refreshToken);

        return { token, user };
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    const refreshToken = getToken(); 
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await httpClient.post(`/User/logout`, { 
            refreshToken
        });

        return response;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

export const registerUser = async (email: string, username: string, password: string) => {
    try {
        const response = await httpClient.post(`/User/register`, {
            email, 
            username, 
            password
        });
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        const user = response.data.user;
        
        setAccessToken(token);
        setRefreshToken(refreshToken);

        return { token, user };
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

    const userId = getUserFromToken(token).sub;

    try {
        const response = await httpClient.get(`/Expense/getCategories`, {
            params: {
                userId,
            }
        });
        
        return response.data.categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addCategory = async (categoryName: string, ) => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    try {
        const response = await httpClient.post(`/Expense/addCategory`, {
            categoryName
        });

        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

export const getFrequencies = async () => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    const userId = getUserFromToken(token).sub;

    try {
        const response = await httpClient.get(`/Expense/getFrequencies`, {
            params: {
                userId,
            }
        });
        
        return response.data.frequencies;
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

    const userId = getUserFromToken(token).sub;

    try {
        const response = await httpClient.get(`/Expense/getExpenses`, {
            params: {
                userId,
            },
        });
        return response.data.expenses;
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
        const response = await httpClient.post(`/Expense/addExpense`, {
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