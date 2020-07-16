import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';
import { ApiResponse } from 'services/api/index';

export const apiFetchSprints = async (workspaceId: number, filter: string): ApiResponse<Sprint[]> => {
    try {
        const { data } = await apiService.query(`workspace/${workspaceId}/sprints`, { filter });
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching sprints';
    }
};
