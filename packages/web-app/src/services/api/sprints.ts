import apiService from './index';

import { Sprint } from 'models/Sprint';

// ----------------------------------------
// Create
// ----------------------------------------

export const apiCreateSprint = async (workspaceId: number, newSprint: Sprint): Promise<Sprint | string> => {
    try {
        const { data } = await apiService.post(`/workspace/${workspaceId}/sprint`, { newSprint });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while creating sprint';
    }
};

// ----------------------------------------
// Read
// ----------------------------------------

export const apiFetchSprints = async (workspaceId: number, filter: string): Promise<Sprint[] | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/sprints`, { params: { filter } });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching sprints';
    }
};

// ----------------------------------------
// Update
// ----------------------------------------

export const apiUpdateSprint = async (workspaceId: number, updatedSprint: Sprint): Promise<Sprint | string> => {
    try {
        const { data } = await apiService.put(`/workspace/${workspaceId}/sprint`, { updatedSprint });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while updating sprint details';
    }
};

// ----------------------------------------
// Delete
// ----------------------------------------
