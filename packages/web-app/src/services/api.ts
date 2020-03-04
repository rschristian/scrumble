import { apiService, authStorageService } from 'ts-api-toolkit';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { Issue } from 'models/Issue';

export const login = async (credentials: LoginUser): Promise<User | string> => {
    return await apiService
        .post('users/login', credentials)
        .then(({ data }) => {
            authStorageService.saveToken(data.user.token);
            return data.user;
        })
        .catch(({ response }) => {
            if (response.data !== '') {
                return response.data.message;
            }
            return 'Unknown error while logging in';
        });
};

export const logout = async (): Promise<void> => {
    return authStorageService.destroyToken();
};

export const register = async (credentials: RegistrationUser): Promise<User | string> => {
    return await apiService
        .post('users/register', credentials)
        .then(({ data }) => {
            authStorageService.saveToken(data.user.token);
            return data.user;
        })
        .catch(({ response }) => {
            if (response.data !== '') {
                return response.data.message;
            }
            return 'Unknown error while registering';
        });
};

// --------------------------
// Issues
// --------------------------
export async function fetchIssueTest(): Promise<Issue | string> {
    return await apiService
        .get('/issues/1')
        .then(({ data }) => {
            console.log(data);
            return data;
        })
        .catch(({ response }) => {
            if (response.data !== '') {
                return response.data.message;
            }
            return 'Unknown error';
        });
}
