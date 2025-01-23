import axios from 'axios';
import { addCategory } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { Category } from '../interfaces/Category';

export const addCategoryAction = (newCategory: Category): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const response = await addCategory(newCategory);

    dispatch({
      type: 'ADD_CATEGORY_SUCCESS',
      payload: response,
    });

    showSuccessToast('New category added');
  } catch (error) {
    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};