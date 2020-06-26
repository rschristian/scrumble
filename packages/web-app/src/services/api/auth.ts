import { apiService, authStorageService } from 'ts-api-toolkit';

import { User } from 'models/User';

// ----------------------------------------
// Create
// ----------------------------------------

// ----------------------------------------
// Read
// ----------------------------------------

export const apiLogin = async (shortLivedJwt: string): Promise<{ jwt: string } | string> => {
    authStorageService.saveToken(shortLivedJwt);
    try {
        const { data } = await apiService.get('/auth/token');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while exchanging tokens';
    }
};

export const apiFetchUserInfo = async (): Promise<User | string> => {
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

export const destroyOAuthToken = async (): Promise<void> => {
    try {
        await apiService.delete('/auth/token');
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching user info';
    }
};
