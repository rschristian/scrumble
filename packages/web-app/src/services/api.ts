import { apiService, authStorageService } from 'ts-api-toolkit';

export const login = async (shortLivedJwt: string): Promise<boolean> => {
    authStorageService.saveToken(shortLivedJwt);
    return await apiService
        .get('/auth/token')
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
        .delete('/auth/token/delete')
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
    apiService.delete('/user/info').then((response) => {
        console.log(response);
        return response;
    });
}
