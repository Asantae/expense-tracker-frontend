import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  username: string | null;
  email: string | null;
}

const initialState: UserState = {
    userId: null,
    username: null,
    email: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ userId: string; username: string, email: string }>) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.email = action.payload.email
        },
        clearUser: (state) => {
            state.userId = null;
            state.username = null;
            state.email = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;