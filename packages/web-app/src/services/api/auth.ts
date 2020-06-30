import apiService, { ApiResponse } from './index';

import { User } from 'models/User';

// ----------------------------------------
// Create
// ----------------------------------------

// ----------------------------------------
// Read
// ----------------------------------------

export const apiLogin = async (): ApiResponse<{ jwt: string }> => {
    try {
        const { data } = await apiService.get('/auth/token');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while exchanging tokens';
    }
};

export const apiFetchUserInfo = async (): ApiResponse<User> => {
    try {
        const { data } = await apiService.get('user/info');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching user info';
    }
};

// ----------------------------------------
// Update
// ----------------------------------------

// ----------------------------------------
// Delete
// ----------------------------------------

export const destroyOAuthToken = async (): ApiResponse<void> => {
    try {
        return await apiService.delete('/auth/token');
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching user info';
    }
};
