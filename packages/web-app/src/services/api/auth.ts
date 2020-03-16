import { apiService, authStorageService } from 'ts-api-toolkit';
import axios from 'axios';

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
        .then(() => {
            authStorageService.destroyToken();
            return true;
        })
        .catch(() => {
            return false;
        });
};

export function fetchWorkspaceIssues() {
    const workspaceId = 23;
    apiService.get(`/workspace/${workspaceId}/issues`).then((response) => {
        console.log(response);
        return response;
    });
}

export function fetchWorkspaceIssuesCached() {
    const workspaceId = 8;
    apiService.get(`/workspace/${workspaceId}/issues/cached`).then((response) => {
        console.log(response);
        return response;
    });
}

export function fetchUserInfo() {
    apiService.get('/user/info').then((response) => {
        console.log(response);
        return response;
    });
}
