import { apiService, authStorageService } from 'ts-api-toolkit';

export const login = async (shortLivedJwt: string): Promise<boolean> => {
    authStorageService.saveToken(shortLivedJwt);
    return await apiService
        .get('/authenticate/token/long-life')
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

export const logout = async (): Promise<void> => {
    return authStorageService.destroyToken();
};

export function fetchUserInfo() {
    console.log("We're in fetchUserInfo");
    apiService.get('/user/info').then((response) => {
        console.log(response);
        return response;
    });
}
