import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: localStorage.getItem('userName') || '',
        token: localStorage.getItem('token') || null,
        error: null,
        loading: false,
    },
    reducers: {
        userRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = action.payload.token;
            state.userName = action.payload.userName;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = null;
            state.userName = '';
        },
        userFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { userRequest, loginSuccess, signUpSuccess, logoutSuccess, userFailure } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;
