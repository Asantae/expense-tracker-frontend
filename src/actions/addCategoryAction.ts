import axios from 'axios';
import { addCategory } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { Category } from '../interfaces/Category';

export const addCategoryAction = (newCategory: Category): ThunkAction<Promise<Category | null>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch({ type: 'user/addCategoryToList/pending'});

    const response = await addCategory(newCategory);

    dispatch({
      type: 'user/addCategoryToList',
      payload: response.category,
    });

    dispatch({ type: 'user/addCategoryToList/fulfilled' });

    showSuccessToast('New category added');
    return response.category
  } catch (error) {
    dispatch({
      type: 'user/addCategoryToList/rejected',
      payload: error,
    });

    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};