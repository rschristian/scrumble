import { apiService } from 'ts-api-toolkit';

import { Project } from 'models/Project';

export const apiFetchProjects = async (): Promise<Project[] | string> => {
    try {
        const { data } = await apiService.get('/projects');
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching projects';
    }
};

export const apiFetchWorkspaceProjects = async (workspaceId: number): Promise<Project[] | string> => {
    try {
        const { data } = await apiService.get(`/workspace/${workspaceId}/projects`);
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching workspace projects';
    }
};
