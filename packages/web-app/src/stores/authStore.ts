import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from 'stores';

import { User } from 'models/User';
import { apiFetchUserInfo } from 'services/api/auth';
import { route } from 'preact-router';

type State = {
    isAuthenticated: boolean;
    currentUser: User | undefined;
};

const initialState: State = {
    isAuthenticated: false,
    currentUser: undefined,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: State): void => {
            state.isAuthenticated = false;
            state.currentUser = undefined;
        },
        login: (state: State): void => {
            state.isAuthenticated = true;
        },
        setUser: (state: State, action: PayloadAction<User>): void => {
            const user = action.payload;

            state.currentUser = {
                id: user.id,
                name: user.name,
                username: user.username,
                avatarUrl: user.avatarUrl,
                projectIds: user.projectIds,
            };
        },
    },
});
export default slice.reducer;

// Actions
const { logout, login, setUser } = slice.actions;

export const logUserOut = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    await dispatch(logout());
    route('/login', true);
};

export const loginAndFetchUserInfo = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(login());
    const result = await apiFetchUserInfo();
    await dispatch(setUser(result));
    route('/', true);
};
