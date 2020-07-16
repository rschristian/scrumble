import { apiService } from 'ts-api-toolkit';

import { Project } from 'models/Project';
import { ApiResponse } from 'services/api/index';

export const apiFetchProjects = async (): ApiResponse<Project[]> => {
    try {
        const { data } = await apiService.get('projects');
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching projects';
    }
};

export const apiFetchWorkspaceProjects = async (workspaceId: number): ApiResponse<Project[]> => {
    try {
        const { data } = await apiService.get(`workspace/${workspaceId}/projects`);
        return data;
    } catch ({ response }) {
        throw response.data?.message || 'Unknown error while fetching workspace projects';
    }
};
