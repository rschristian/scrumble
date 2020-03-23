import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';

// GitLab API: POST /projects/:id/issues
export const createIssue = async (workspaceId: number, projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/project/${projectId}/issue`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: PUT /projects/:id/issues/:issue_iid
export const editIssue = async (workspaceId: number, projectId: number, issue: Issue): Promise<void | string> => {
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

export const fetchWorkspaceIssues = async (
    workspaceId: number,
    filter: string,
    projectId: number,
    page: number,
): Promise<IssuePagination> => {
    const args = { filter, projectId, page };
    return await apiService.query(`/workspace/${workspaceId}/issues`, { params: args }).then((response) => {
        console.log(response);
        return response.data;
    });
};
