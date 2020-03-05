import { apiService, authStorageService } from 'ts-api-toolkit';

import { RegistrationUser, User } from 'models/User';

export const login = async (shortLivedJwt: string): Promise<boolean> => {
    // TODO: Alter to check for successful/unsuccessful authentication rather than static boolean
    authStorageService.saveToken(shortLivedJwt);
    return await apiService.get('/authenticate/token/long-life').then((response) => {
        authStorageService.saveToken(response.data.jwt);
        return true;
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

export function fetchUserInfo() {
    console.log("We're in fetchUserInfo");
    apiService.get('/user/info').then((response) => {
        console.log(response);
        return response;
    });
}
