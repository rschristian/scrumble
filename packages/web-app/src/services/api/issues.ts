import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';

export async function fetchIssueTest(): Promise<Issue[]> {
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
        .post(`issues/createIssue/${projectId}`, issue)
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
        .put(`issues/editIssue/${projectId}`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: DELETE /projects/:id/issues/:issue_iid
export const deleteIssue = async (workspaceId: number, projectId: number, issueId: number): Promise<void | string> => {
    return await apiService
        .delete(`/workspace/${workspaceId}/project/${projectId}/issue/${issueId}`)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};
