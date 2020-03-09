import { apiService, authStorageService } from 'ts-api-toolkit';

export const login = async (shortLivedJwt: string): Promise<boolean> => {
    authStorageService.saveToken(shortLivedJwt);
    return await apiService
        .get('/authentication/token/long-life')
        .then((response) => {
            if (response.status != 200) {
                return false;
            }
            authStorageService.saveToken(response.data.jwt);
            return true;
        })
        .catch(() => {
            return false;
        });
};

export const destroyOAuthToken = async (): Promise<boolean> => {
    return await apiService
        .get('/authentication/token/revoke')
        .then((response) => {
            console.log(response.status);
            authStorageService.destroyToken();
            return true;
        })
        .catch(() => {
            return false;
        });
};

export function fetchUserInfo() {
    console.log("We're in fetchUserInfo");
    apiService.get('/user/info').then((response) => {
        console.log(response);
        return response;
    });
}
