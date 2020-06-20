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

// GitLab API: POST /projects/:id/milestones/
export const createSprint = async (workspaceId: number, newSprint: Sprint): Promise<Sprint | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/sprint`, { newSprint })
        .then((result) => {
            return result.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while creating sprint';
        });
};

// GitLab API: PUT /projects/:id/milestones/:milestone_id
export const editSprint = async (workspaceId: number, updatedSprint: Sprint): Promise<Sprint | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}/sprint`, { updatedSprint })
        .then((result) => {
            return result.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating sprint details';
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
