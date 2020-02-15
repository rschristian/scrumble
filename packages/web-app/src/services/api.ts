import { apiService, authStorageService } from 'ts-api-toolkit';
import { LoginUser, RegistrationUser, User } from 'models/User';

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
            } else {
                return 'Unknown error while logging in';
            }
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
            } else {
                return 'Unknown error while registering';
            }
        });
};
