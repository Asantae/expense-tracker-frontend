import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../interfaces/Category';
import { Expense } from '../interfaces/Expense';
import { User } from '../interfaces/User';

interface UserState {
  userId: string | null;
  username: string | null;
  email: string | null;
  expensesList: Expense[] | null;
  categoriesList: Category[] | null;
}

const initialState: UserState = {
    userId: null,
    username: null,
    email: null,
    expensesList: null,
    categoriesList: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction< User >) => {
            state.userId = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
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
        addExpenseToList: (state, action: PayloadAction<Expense>) => {
            if(state.expensesList){
                state.expensesList.push(action.payload);
            } else {
                state.expensesList = [action.payload];
            }
        },
        addCategoryToList: (state, action: PayloadAction<Category>) => {
            if(state.categoriesList){
                state.categoriesList.push(action.payload);
            } else {
                state.categoriesList = [action.payload];
            }
        },
        editExpenseInList: (state, action: PayloadAction<Expense>) => {
            if (state.expensesList) {
                state.expensesList = state.expensesList.map((expense) =>
                    expense.id === action.payload.id ? action.payload : expense
                );
            }
        },
        deleteExpenseInList: (state, action: PayloadAction<string[]>) => {
            if(state.expensesList) {
                state.expensesList = state.expensesList.filter(
                    (expense) => !action.payload.includes(expense.id ?? '')
                );
            }
        }
    },
});

export const { setUser, clearUser, setCategories, setExpenses, editExpenseInList } = userSlice.actions;
export default userSlice.reducer;