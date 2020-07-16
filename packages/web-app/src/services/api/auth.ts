import { apiService } from 'ts-api-toolkit';

import { ApiResponse } from './index';

import { User } from 'models/User';

export const apiFetchUserInfo = async (): ApiResponse<User> => {
    try {
        const { data } = await apiService.get('user/info');
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching user info';
    }
};
