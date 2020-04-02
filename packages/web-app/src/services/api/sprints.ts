import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';

// GitLab API: PUT /projects/:id/milestones
export const getSprints = async (workspaceId: number, projectId: number): Promise<Sprint[] | string> => {
    return await apiService
        .get(`/workspace/${workspaceId}/project/${projectId}/sprints`)
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating sprint details';
        });
};

// GitLab API: POST /projects/:id/milestones/
export const createSprint = async (workspaceId: number, newSprint: Sprint): Promise<void | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/sprint`, newSprint)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while creating sprint';
        });
};

// GitLab API: PUT /projects/:id/milestones/:milestone_id
export const editSprint = async (
    workspaceId: number,
    projectId: number,
    sprintId: number,
    updatedSprint: Sprint,
): Promise<void | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}/project/${projectId}/sprint/${sprintId}`, updatedSprint)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating sprint details';
        });
};

// GitLab API: PUT /projects/:id/milestones/:milestone_id
export const toggleSprintStatus = async (
    workspaceId: number,
    projectId: number,
    sprintId: number,
): Promise<void | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}/project/${projectId}/sprint/${sprintId}/status/toggle`, {})
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating sprint status';
        });
};
