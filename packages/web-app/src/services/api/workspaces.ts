import { apiService } from 'ts-api-toolkit';

import { Workspace } from 'models/Workspace';

export const apiFetchWorkspaces = async (): Promise<Workspace[] | string> => {
    try {
        const { data } = await apiService.get('/workspaces');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching workspaces';
    }
};
