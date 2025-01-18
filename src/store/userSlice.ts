import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../interfaces/Category';
import { Expense } from '../../interfaces/Expenses';

interface UserState {
  userId: string | null;
  username: string | null;
  email: string | null;
  expensesList: Expense[];
  categoriesList: Category[];
}

const initialState: UserState = {
    userId: null,
    username: null,
    email: null,
    expensesList: [],
    categoriesList: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ userId: string; }>) => {
            state.userId = action.payload.userId;
        },
        clearUser: (state) => {
            state.userId = null;
            state.username = null;
            state.email = null;
            state.expensesList = [];
            state.categoriesList = [];
        },
        setCategories: (state, action: PayloadAction<{ categories: Category[] }>) => {
            state.categoriesList = action.payload.categories;
        },
        setExpenses: (state, action: PayloadAction<{ expenses: Expense[] }>) => {
            state.expensesList = action.payload.expenses;
        },
    },
});

export const { setUser, clearUser, setCategories, setExpenses } = userSlice.actions;
export default userSlice.reducer;