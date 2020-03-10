import { apiService } from 'ts-api-toolkit';

// GitLab API: PUT /projects/:id/milestones/:milestone_id
// So I like returning void / string. If there's no error, return void, else, pass the error message forward
// Maybe we should actually combine the open/close methods and just toggle the status? Don't know. Food for thought.
export const closeSprint = async (sprintId: number): Promise<void | string> => {
    return await apiService
        .put('sprints/status/close', { sprintId })
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while closing sprint';
        });
};

// GitLab API: PUT /projects/:id/milestones/:milestone_id
export const openSprint = async (sprintId: number): Promise<void | string> => {
    return await apiService
        .put('sprints/status/open', { sprintId })
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while opening sprint';
        });
};
