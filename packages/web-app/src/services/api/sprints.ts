import { apiService } from 'ts-api-toolkit';

// GitLab API: PUT /projects/:id/milestones/:milestone_id
// So I like returning void / string. If there's no error, return void, else, pass the error message forward
export const toggleSprintStatus = async (sprintId: number): Promise<void | string> => {
    return await apiService
        .put('sprints/status/close', { sprintId })
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};
