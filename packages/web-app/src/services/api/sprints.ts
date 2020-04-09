import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';

// GitLab API: PUT /projects/:id/milestones
export const getSprints = async (workspaceId: number): Promise<Sprint[] | string> => {
    return await apiService
        .get(`/workspace/${workspaceId}/sprints`)
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
        .post(`/workspace/${workspaceId}/sprint`, newSprint)
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
        .put(`/workspace/${workspaceId}/sprint`, updatedSprint)
        .then((result) => {
            return result.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating sprint details';
        });
};

// GitLab API: PUT /projects/:id/milestones/:milestone_id
export const toggleSprintStatus = async (workspaceId: number, sprintId: number): Promise<void | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}/sprint/${sprintId}/status/toggle`, {})
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating sprint status';
        });
};
