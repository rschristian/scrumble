import apiService from './index';

import { Workspace } from 'models/Workspace';

// ----------------------------------------
// Create
// ----------------------------------------

export const apiCreateWorkspace = async (newWorkspace: Workspace): Promise<Workspace | string> => {
    try {
        const { data } = await apiService.post('/workspace', { newWorkspace });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while creating workspaces';
    }
};

// ----------------------------------------
// Read
// ----------------------------------------

export const apiFetchWorkspaces = async (): Promise<Workspace[] | string> => {
    try {
        const { data } = await apiService.get('/workspaces');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching workspaces';
    }
};

// ----------------------------------------
// Update
// ----------------------------------------

export const apiUpdateWorkspace = async (
    workspaceId: number,
    updatedWorkspace: Workspace,
): Promise<Workspace | string> => {
    try {
        const { data } = await apiService.put(`/workspace/${workspaceId}`, { updatedWorkspace });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while updating workspace details';
    }
};

// ----------------------------------------
// Delete
// ----------------------------------------
