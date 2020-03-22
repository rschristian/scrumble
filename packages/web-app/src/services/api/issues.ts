import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';
import { issues } from '../../data';
import { IssuePagination } from '../../models/IssuePagination';

// GitLab API: POST /projects/:id/issues
export const createIssue = async (workspaceId: number, projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/project/${projectId}/issue`, { issue })
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: PUT /projects/:id/issues/:issue_iid
export const editIssue = async (
    workspaceId: number,
    projectId: number,
    issueId: number,
    issue: Issue,
): Promise<void | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}/project/${projectId}/issue/${issueId}`, { issue })
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

export const mockedWorkspaceIssues = async (): Promise<Issue[]> => {
    return issues;
};

export const fetchWorkspaceIssuesCached = async (): Promise<Issue[]> => {
    const workspaceId = 8;
    return await apiService.get(`/workspace/${workspaceId}/issues/cached`).then((response) => {
        console.log(response);
        return response.data;
    });
};
