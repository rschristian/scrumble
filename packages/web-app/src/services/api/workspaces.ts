import { apiService } from 'ts-api-toolkit';

import { Workspace } from 'models/Workspace';

// Implementation will be Scrumble-Only, GitLab has no concept of Workspaces
export const editWorkspace = async (workspaceId: number, updatedWorkspace: Workspace): Promise<Workspace | string> => {
    console.log('workspace api');
    console.log(updatedWorkspace.projectIds);
    return await apiService
        .put(`/workspace/${workspaceId}`, updatedWorkspace)
        .then((result) => {
            return result.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};

export const createWorkspace = async (workspace: Workspace): Promise<Workspace | string> => {
    console.log('about to create workspace');
    console.log(workspace.projectIds);
    return await apiService
        .post('/workspace', workspace)
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};

export const getWorkspaces = async (): Promise<Workspace[] | string> => {
    return await apiService
        .get('/workspaces')
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};
