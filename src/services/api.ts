import axios from 'axios';

const API_BASE_URL = 'http://localhost:5221/api/expense';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchExpenses = async () => {
    const response = await fetch(`${API_BASE_URL}/expense`);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    return response.json();
};