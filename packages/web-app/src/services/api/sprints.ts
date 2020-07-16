import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';

export const apiFetchSprints = async (workspaceId: number, filter: string): Promise<Sprint[] | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/sprints`, { params: { filter } });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching sprints';
    }
};
