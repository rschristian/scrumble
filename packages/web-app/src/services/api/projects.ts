import { apiService } from 'ts-api-toolkit';
import { Project } from 'models/Project';

export const getProjects = async (): Promise<Project[] | string> => {
    return await apiService
        .get('/projects')
        .then((response) => {
            console.log('projects');
            console.log(response.data);
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while updating workspace details';
        });
};
