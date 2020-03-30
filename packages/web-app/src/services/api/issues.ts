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
export const createIssue = async (workspaceId: number, projectId: number, issue: Issue): Promise<Issue | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/project/${projectId}/issue`, issue)
        .then((response) => {
            return response.data;
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
        .put(`/workspace/${workspaceId}/project/${projectId}/issue/${issueId}`, issue)
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
): Promise<IssuePagination | string> => {
    const args = { filter, projectId, page };
    return await apiService
        .query(`/workspace/${workspaceId}/issues`, { params: args })
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while fetching workspace issues';
        });
};

export const searchIssueByTitleDescription = async (
    workspaceId: number,
    searchFor: string,
    filter: string,
): Promise<Issue[] | string> => {
    const args = { searchFor, filter };
    return await apiService
        .query(`/workspace/${workspaceId}/issues/search`, { params: args })
        .then((response) => {
            return response.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while searching for issue';
        });
};

// GitLab API: POST /projects/:id/issues/:issue_iid/time_estimate
export const addEstimate = async (projectId: number, issue: Issue): Promise<void | string> => {
    await apiService
        .post(`/workspace/${projectId}/addEstimate`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while adding estimate';
        });
};
