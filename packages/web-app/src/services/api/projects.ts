import { apiService } from 'ts-api-toolkit';
import { Project } from 'models/Project';

export const getProjects = async (): Promise<Project[] | string> => {
    return await apiService
        .get('/projects')
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};

export const getWorkspaceProjects = async (workspaceId: number): Promise<Project[] | string> => {
    return await apiService
        .get(`/workspace/${workspaceId}/projects`)
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};
