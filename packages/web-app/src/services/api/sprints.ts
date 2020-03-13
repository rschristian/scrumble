import { apiService } from 'ts-api-toolkit';

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
