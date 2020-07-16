import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';
import { Sprint } from 'models/Sprint';
import { ApiResponse } from 'services/api/index';

export const apiFetchIssues = async (
    workspaceId: number,
    projectId: number,
    page: number,
    filter: string,
    searchFor: string,
): ApiResponse<IssuePagination> => {
    try {
        const { data } = await apiService.query(`workspace/${workspaceId}/issues`, {
            projectId,
            page,
            filter,
            searchFor,
        });
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching workspace issues';
    }
};

export const apiFetchSprintIssues = async (workspaceId: number, sprint: Sprint): ApiResponse<Issue[]> => {
    try {
        const { data } = await apiService.query(`workspace/${workspaceId}/sprint/issues`, {
            projectIdToMilestoneIds: JSON.stringify(sprint.projectIdToMilestoneIds),
        });
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching sprint issues';
    }
};
