import { getCategories } from '../services/api';
import { showErrorToast } from '../utils/toastUtil';

export const loadCategories = async () => {
    try {
        const categories = await getCategories();
        return categories;
    } catch (error) {
        showErrorToast('Failed to load categories.');
        console.error(error)
    }
};