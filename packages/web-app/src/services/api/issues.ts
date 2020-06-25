import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';
import { Sprint } from 'models/Sprint';

export const apiFetchIssues = async (
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

export const apiFetchSprintIssues = async (workspaceId: number, sprint: Sprint): Promise<Issue[] | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/sprint/issues`, {
            params: { projectIdToMilestoneIds: sprint.projectIdToMilestoneIds },
        });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching sprint issues';
    }
};
