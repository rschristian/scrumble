import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';
import { Issue } from 'models/Issue';

export const getSprints = async (workspaceId: number, filter: string): Promise<Sprint[] | string> => {
    const args = { filter };
    return await apiService
        .query(`/workspace/${workspaceId}/sprints`, { params: args })
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while retrieving sprints';
        });
};

export const getSprintIssues = async (workspaceId: number, sprint: Sprint): Promise<Issue[] | string> => {
    const projectIdToMilestoneIds = sprint.projectIdToMilestoneIds;
    const args = { projectIdToMilestoneIds };
    return await apiService
        .query(`/workspace/${workspaceId}/sprint/issues`, { params: args })
        .then((result) => {
            return result.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while getting issues ';
        });
};
