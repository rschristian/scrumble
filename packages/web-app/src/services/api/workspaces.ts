import { apiService } from 'ts-api-toolkit';

import { Workspace } from 'models/Workspace';

// Implementation will be Scrumble-Only, GitLab has no concept of Workspaces
export const editWorkspace = async (workspaceId: number, updatedWorkspace: Workspace): Promise<void | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}`, updatedWorkspace)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};
