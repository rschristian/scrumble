import { apiService } from 'ts-api-toolkit';

import { Sprint } from 'models/Sprint';

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
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: PUT PUT /projects/:id/milestones/:milestone_id
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
