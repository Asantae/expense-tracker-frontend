import { getUser } from '../services/api';
import { showErrorToast } from '../utils/toastUtil';
import { setUser } from '../store/userSlice';
import { User } from '../interfaces/User';

export const loadUser = async (dispatch: any) => {
    try {
        const user: User = await getUser();

        dispatch(setUser(user));

        return user;
    } catch (error) {
        showErrorToast('Failed to load user');
        console.error(error)
        return [];
    }
};