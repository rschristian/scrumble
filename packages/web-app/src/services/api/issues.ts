import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';

export async function fetchIssues(workspaceId: number): Promise<Issue[] | string> {
    return await apiService
        .get(`/workspace/${workspaceId}/issues`)
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while retrieving issues';
        });
}
// GitLab API: POST /projects/:id/issues
export const createIssue = async (workspaceId: number, projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/project/${projectId}/issue`, { issue })

        .then(() => {
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while creating issue';
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
            return response.data?.message || 'Unknown error while editing issue';
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
