import { apiService } from 'ts-api-toolkit';

import { IssuePagination } from 'models/IssuePagination';

export const getIssues = async (
    workspaceId: number,
    projectId: number,
    page: number,
    filter: string,
    searchFor: string,
): Promise<IssuePagination | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/issues`, {
            params: { projectId, page, filter, searchFor },
        });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching workspace issues';
    }
};
