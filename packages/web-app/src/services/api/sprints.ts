import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';
import { Issue } from 'models/Issue';

export const getSprints = async (workspaceId: number, filter: string): Promise<Sprint[] | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/sprints`, { params: { filter } });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching sprints';
    }
};

export const getSprintIssues = async (workspaceId: number, sprint: Sprint): Promise<Issue[] | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/sprint/issues`, {
            params: { projectIdToMilestoneIds: sprint.projectIdToMilestoneIds },
        });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching sprint issues';
    }
};
