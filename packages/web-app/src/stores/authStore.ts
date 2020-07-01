import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from 'stores';

import { User } from 'models/User';
import { apiFetchUserInfo, apiLogin, destroyOAuthToken } from 'services/api/auth';
import { route } from 'preact-router';
import { authStorageService } from 'ts-api-toolkit';

const defaultUser: User = {
    id: -1,
    name: '',
    username: '',
    avatarUrl: '',
    projectIds: [],
};

type State = {
    isAuthenticated: boolean;
    currentUser: User;
    error: string;
};

const initialState: State = {
    isAuthenticated: false,
    currentUser: defaultUser,
    error: '',
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: State): void => {
            authStorageService.destroyToken();
            state.isAuthenticated = false;
            state.currentUser = defaultUser;
        },
        loginStart: (state: State, action: PayloadAction<string>): void => {
            authStorageService.saveToken(action.payload);
        },
        loginSuccess: (state: State, action: PayloadAction<{ jwt: string }>): void => {
            authStorageService.saveToken(action.payload.jwt);
            state.isAuthenticated = true;
        },
        loginFailure: (state: State, action: PayloadAction<string>): void => {
            state.error = action.payload;
        },
        fetchUserInfoSuccess: (state: State, action: PayloadAction<User>): void => {
            const user = action.payload;

            state.currentUser = {
                id: user.id,
                name: user.name,
                username: user.username,
                avatarUrl:
                    user.avatarUrl.indexOf('gravatar.com') > -1
                        ? user.avatarUrl
                        : `https://gitlab.ryanchristian.dev${user.avatarUrl.slice(user.avatarUrl.indexOf('/uploads'))}`,
                projectIds: user.projectIds,
            };
        },
        fetchUserInfoFailure: (state: State, action: PayloadAction<string>): void => {
            state.error = action.payload;
        },
    },
});
export default slice.reducer;

// Actions
const { logout, loginStart, loginSuccess, loginFailure, fetchUserInfoSuccess, fetchUserInfoFailure } = slice.actions;

export const reduxLogUserOut = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    await destroyOAuthToken();
    dispatch(logout());
    route('/login', true);
};

export const reduxLoginAndFetchUserInfo = (shortLivedJwt: string): AppThunk => async (
    dispatch: AppDispatch,
): Promise<void> => {
    dispatch(loginStart(shortLivedJwt));
    const loginResult = await apiLogin().catch((error) => {
        dispatch(loginFailure(error));
    });
    if (loginResult) {
        dispatch(loginSuccess(loginResult));
    }

    const userInfoResult = await apiFetchUserInfo().catch((error) => {
        dispatch(fetchUserInfoFailure(error));
    });
    if (userInfoResult) {
        dispatch(fetchUserInfoSuccess(userInfoResult));
    }
    // TODO This might be an issue, honestly not sure
    route('/', true);
};
