import { getToken, getUserFromToken, setAccessToken, setRefreshToken } from '../utils/tokenUtil';
import httpClient from '../utils/httpClient';
import { Category } from '../interfaces/Category';
import { Expense } from '../interfaces/Expense';
import { Frequency } from '../interfaces/FrequencyEnum';

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

export const loginGuest = async () => {
    try {
        const response = await httpClient.post(`/User/guest`, {});
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

export const registerAsGuest = async (email: string, username: string, password: string) => {
    const token = getToken();

    if (!token) {
        throw new Error('Guest user is not logged in.');
    }

    const userId = getUserFromToken(token).sub;
    try {
        const response = await httpClient.post(`/User/registerGuest`,
        {
            email: email,
            username: username,
            password: password,
        }, 
        {
            params: {
                userId,
            },
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

export const addCategory = async (newCategory: Category) => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    const userId = getUserFromToken(token).sub;

    try {
        const response = await httpClient.post(`/Expense/addCategory`, 
        {
            name: newCategory.name
        }, 
        {
            params: {
                userId,
            },
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

export const addExpense = async (expense: Expense) => {
    const token = getToken();

    if (!token) {
        throw new Error('User is not logged in.');
    }

    const userId =  getUserFromToken(token).sub;

    try {
        const response = await httpClient.post(`/Expense/addExpense`, 
        {
            id: '',
            createdBy: '',
            amount: expense.amount,
            description: expense.description,
            categoryId: expense.categoryId,
            frequency: Frequency[expense.frequency]
        },
        {
            params: {
                userId,
            }
        });
console.log(response);

        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};