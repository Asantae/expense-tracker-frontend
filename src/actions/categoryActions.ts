import { fetchCategories } from '../services/api';
import { toast } from 'react-toastify';

export const loadCategories = async () => {
    try {
        const categories = await fetchCategories();
        return categories;
    } catch (error) {
        toast.error('Failed to load categories.');
        throw error;
    }
};