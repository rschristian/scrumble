import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'stores';

import { User } from 'models/User';
import { fetchUserInfo } from 'services/api/auth';

type State = {
    isAuthenticated: boolean;
    currentUser: User;
};

const initialState: State = {
    isAuthenticated: false,
    currentUser: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state: State): void => {
            state.isAuthenticated = false;
            state.currentUser = null;
        },
        logIn: (state: State): void => {
            state.isAuthenticated = true;
        },
        setCurrentUser: (state: State, action: PayloadAction<User>): void => {
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
const { logOut, logIn, setCurrentUser } = slice.actions;

export const logout = () => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(logOut());
};

export const login = () => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(logIn());
};

export const fetchCurrentUserInfo = () => async (dispatch: AppDispatch): Promise<void> => {
    return await fetchUserInfo().then((user) => {
        dispatch(setCurrentUser(user));
    });
};
