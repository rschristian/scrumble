import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';

export async function fetchIssues(): Promise<Issue[]> {
    return await apiService
        .get('/issues/all')
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            if (response.data !== '') {
                return response.data.message;
            }
            return 'Unknown error';
        });
}

// GitLab API: POST /projects/:id/issues
export const createIssue = async (projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .post(`issues/${projectId}/createIssue`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: PUT /projects/:id/issues/:issue_iid
export const editIssue = async (projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .put(`issues/${projectId}/editIssue/`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};
