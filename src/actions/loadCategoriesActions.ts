import { getCategories } from '../services/api';
import { showErrorToast } from '../utils/toastUtil';
import { setCategories } from '../store/userSlice';
import { Category } from '../interfaces/Category';

export const loadCategories = async (dispatch: any) => {
    try {
        const categoriesList: Category[] = await getCategories();

        dispatch(setCategories({ categories: categoriesList }));

        return categoriesList;
    } catch (error) {
        showErrorToast('Failed to load categories');
        console.error(error)
        return [];
    }
};