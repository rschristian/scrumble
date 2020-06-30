import apiService, { ApiResponse } from './index';

import { Project } from 'models/Project';

// ----------------------------------------
// Create
// ----------------------------------------

// ----------------------------------------
// Read
// ----------------------------------------

export const apiFetchProjects = async (): ApiResponse<Project[]> => {
    try {
        const { data } = await apiService.get('/projects');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching projects';
    }
};

export const apiFetchWorkspaceProjects = async (workspaceId: number): ApiResponse<Project[]> => {
    try {
        const { data } = await apiService.get(`/workspace/${workspaceId}/projects`);
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching workspace projects';
    }
};

// ----------------------------------------
// Update
// ----------------------------------------

// ----------------------------------------
// Delete
// ----------------------------------------
