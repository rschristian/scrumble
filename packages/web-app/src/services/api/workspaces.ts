import { apiService } from 'ts-api-toolkit';

import { Workspace } from 'models/Workspace';
import { ApiResponse } from 'services/api/index';

export const apiFetchWorkspaces = async (): ApiResponse<Workspace[]> => {
    try {
        const { data } = await apiService.get('workspaces');
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching workspaces';
    }
};
