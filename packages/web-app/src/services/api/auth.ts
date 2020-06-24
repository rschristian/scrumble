import { apiService } from 'ts-api-toolkit';

import { User } from 'models/User';

export const apiFetchUserInfo = async (): Promise<User> => {
    const { data } = await apiService.get('user/info');
    return data;
};
