import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  username: string | null;
  email: string | null;
  listExpenses: string[] | [];
  listAdditionalCategories: string[] | []
}

const initialState: UserState = {
    userId: null,
    username: null,
    email: null,
    listExpenses: [],
    listAdditionalCategories: [],
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
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;