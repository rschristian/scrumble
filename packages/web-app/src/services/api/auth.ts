import { apiService, authStorageService } from 'ts-api-toolkit';
import { User } from 'models/user';

export const login = async (shortLivedJwt: string): Promise<boolean> => {
    authStorageService.saveToken(shortLivedJwt);
    return await apiService
        .get('/auth/token')
        .then((response) => {
            authStorageService.saveToken(response.data.jwt);
            return true;
        })
        .catch(() => {
            return false;
        });
};

export const destroyOAuthToken = async (): Promise<boolean> => {
    return await apiService
        .delete('/auth/token/delete')
        .then((response) => {
            authStorageService.destroyToken();
            return true;
        })
        .catch(() => {
            return false;
        });
};

export const fetchUserInfo = async (): Promise<User> => {
    return await apiService.get('user/info').then(({ data }) => {
        return data;
    });
};
export async function fetchAllIssues() {
    const response = await apiService.get('/issues/all');
    return response.data;
}

export const fetchSpecificUser = async (id: number): Promise<User> => {
    return await apiService.get(`user/getUser/${id}`).then(({ data }) => {
        return data;
    });
};
