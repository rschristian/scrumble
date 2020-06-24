import { apiService } from 'ts-api-toolkit';

import { Workspace } from 'models/Workspace';

export const getWorkspaces = async (): Promise<Workspace[] | string> => {
    return await apiService
        .get('/workspaces')
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};

export const createWorkspace = async (newWorkspace: Workspace): Promise<Workspace | string> => {
    return await apiService
        .post('/workspace', { newWorkspace })
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};
